import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Batch, Car } from '@/lib/models';

// GET /api/batches/[id] - Get a specific batch by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const batch = await Batch.findById(params.id).lean();

    if (!batch) {
      return NextResponse.json(
        { success: false, error: 'Batch not found' },
        { status: 404 }
      );
    }

    // Get cars count for this batch
    const carsCount = await Car.countDocuments({ batchNo: params.id });
    const soldCarsCount = await Car.countDocuments({ 
      batchNo: params.id, 
      status: 'sold' 
    });

    // Calculate total revenue from sold cars
    const soldCars = await Car.find({ 
      batchNo: params.id, 
      status: 'sold' 
    }).select('saleInfo.soldPrice').lean();
    
    const totalRevenue = soldCars.reduce((sum, car) => {
      return sum + (car.saleInfo?.soldPrice || 0);
    }, 0);

    return NextResponse.json({
      success: true,
      data: {
        ...batch,
        totalCars: carsCount,
        soldCars: soldCarsCount,
        revenue: totalRevenue
      }
    });

  } catch (error) {
    console.error('Error fetching batch:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch batch' },
      { status: 500 }
    );
  }
}

// PUT /api/batches/[id] - Update a specific batch
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Check if batch exists
    const existingBatch = await Batch.findById(params.id);
    if (!existingBatch) {
      return NextResponse.json(
        { success: false, error: 'Batch not found' },
        { status: 404 }
      );
    }

    // Check if batch number is being changed and if it already exists
    if (body.batchNo && body.batchNo !== existingBatch.batchNo) {
      const duplicateBatch = await Batch.findOne({ 
        batchNo: body.batchNo,
        _id: { $ne: params.id }
      });
      if (duplicateBatch) {
        return NextResponse.json(
          { success: false, error: 'Batch number already exists' },
          { status: 409 }
        );
      }
    }

    // Validate percentage share if provided
    if (body.investor?.percentageShare !== undefined) {
      if (body.investor.percentageShare < 0 || body.investor.percentageShare > 100) {
        return NextResponse.json(
          { success: false, error: 'Percentage share must be between 0 and 100' },
          { status: 400 }
        );
      }
    }

    // Update batch
    const updatedBatch = await Batch.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedBatch,
      message: 'Batch updated successfully'
    });

  } catch (error: any) {
    console.error('Error updating batch:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Batch number already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update batch' },
      { status: 500 }
    );
  }
}

// DELETE /api/batches/[id] - Delete a specific batch
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    // Check if batch exists
    const batch = await Batch.findById(params.id);
    if (!batch) {
      return NextResponse.json(
        { success: false, error: 'Batch not found' },
        { status: 404 }
      );
    }

    // Check if batch has cars
    const carsCount = await Car.countDocuments({ batchNo: params.id });
    if (carsCount > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Cannot delete batch. It has ${carsCount} car(s) associated with it. Please remove or reassign the cars first.` 
        },
        { status: 400 }
      );
    }

    // Delete batch
    await Batch.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: 'Batch deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting batch:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete batch' },
      { status: 500 }
    );
  }
}
