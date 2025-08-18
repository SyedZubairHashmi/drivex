import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Car } from '@/lib/models';
import { CreateCarInput } from '@/lib/models/types';
import mongoose from 'mongoose';

// GET /api/cars - Get all cars with optional filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const batchNo = searchParams.get('batchNo');
    const status = searchParams.get('status');
    const company = searchParams.get('company');
    const auctionGrade = searchParams.get('auctionGrade');
    const isFeatured = searchParams.get('isFeatured');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};
    
    if (batchNo) {
      filter.batchNo = batchNo;
    }
    
    if (status) {
      filter.status = status;
    }
    
    if (company) {
      filter.company = { $regex: company, $options: 'i' };
    }
    
    if (auctionGrade) {
      filter.auctionGrade = parseInt(auctionGrade);
    }
    
    if (isFeatured !== null) {
      filter.isFeatured = isFeatured === 'true';
    }

    // Execute query with pagination
    const cars = await Car.find(filter)
      .populate('batchNo', 'batchNo investor.name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Car.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: cars,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cars' },
      { status: 500 }
    );
  }
}

// POST /api/cars - Create a new car
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body: CreateCarInput = await request.json();
    
    console.log('Received car data:', JSON.stringify(body, null, 2));
    
    // Validate required fields
    const requiredFields = [
      'carName', 'company', 'engineNumber', 'chasisNumber', 
      'auctionGrade', 'importYear', 'assembly', 'engineCapacity',
      'interiorColor', 'mileage', 'color', 'deliveryTimeframe',
      'batchNo', 'description', 'financing', 'images'
    ];
    
    for (const field of requiredFields) {
      if (!body[field as keyof CreateCarInput]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate financing fields
    const financingFields = [
      'auctionPrice', 'auctionTaxes', 'inlandCharges', 'shipmentCharges',
      'variantDuty', 'passportCharges', 'serviceCharges', 'transportCharges',
      'repairCharges', 'miscellaneousCharges'
    ];
    
    for (const field of financingFields) {
      if (!body.financing[field as keyof typeof body.financing]) {
        return NextResponse.json(
          { success: false, error: `Missing required financing field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate images
    if (!body.images.carPictures || body.images.carPictures.length < 4) {
      return NextResponse.json(
        { success: false, error: 'At least 4 car pictures are required' },
        { status: 400 }
      );
    }

    // Check if batch exists by ID or batch number
    const Batch = (await import('@/lib/models')).Batch;
    let existingBatch;
    
    // First try to find by ObjectId
    if (mongoose.Types.ObjectId.isValid(body.batchNo)) {
      existingBatch = await Batch.findById(body.batchNo);
    }
    
    // If not found by ID, try to find by batch number
    if (!existingBatch) {
      // Try to find by exact batch number first
      existingBatch = await Batch.findOne({ batchNo: body.batchNo });
      
      // If not found, try to find by batch number with "BATCH-" prefix
      if (!existingBatch) {
        existingBatch = await Batch.findOne({ batchNo: `BATCH-2023-${body.batchNo.padStart(3, '0')}` });
      }
      
      // If still not found, try to find by batch number with "Batch " prefix
      if (!existingBatch) {
        existingBatch = await Batch.findOne({ batchNo: `Batch ${body.batchNo.padStart(2, '0')}` });
      }
    }
    
    if (!existingBatch) {
      return NextResponse.json(
        { success: false, error: `Batch not found with ID or number: ${body.batchNo}` },
        { status: 404 }
      );
    }
    
    // Replace batchNo with the actual ObjectId for the car creation
    body.batchNo = existingBatch._id;

    // Create new car
    const car = new Car(body);
    const savedCar = await car.save();
    
    // Populate batch information
    await savedCar.populate('batchNo', 'batchNo investor.name');

    return NextResponse.json({
      success: true,
      data: savedCar,
      message: 'Car created successfully'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating car:', error);
    
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
        { success: false, error: 'Car with this engine number or chassis number already exists' },
        { status: 409 }
      );
    }

    // Handle cast errors (invalid ObjectId)
    if (error.name === 'CastError') {
      return NextResponse.json(
        { success: false, error: 'Invalid ID format provided' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: `Failed to create car: ${error.message}` },
      { status: 500 }
    );
  }
}
