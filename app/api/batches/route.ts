import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Batch } from '@/lib/models';
import { CreateBatchInput } from '@/lib/models/types';

// GET /api/batches - Get all batches with optional filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const investorEmail = searchParams.get('investorEmail');
    const investorCnic = searchParams.get('investorCnic');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (investorEmail) {
      filter['investor.emailAddress'] = { $regex: investorEmail, $options: 'i' };
    }
    
    if (investorCnic) {
      filter['investor.cnic'] = { $regex: investorCnic, $options: 'i' };
    }

    // Execute query with pagination
    const batches = await Batch.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Batch.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: batches,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching batches:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch batches' },
      { status: 500 }
    );
  }
}

// POST /api/batches - Create a new batch
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body: CreateBatchInput = await request.json();
    
    console.log('Received batch data:', JSON.stringify(body, null, 2));
    
    // Validate required fields
    const requiredFields = [
      'batchNo', 'investor'
    ];
    
    for (const field of requiredFields) {
      if (!body[field as keyof CreateBatchInput]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate investor fields
    const investorFields = [
      'name', 'contactNumber', 'emailAddress', 'investorId', 
      'cnic', 'investmentAmount', 'percentageShare', 'paymentDate', 'paymentMethod'
    ];
    
    for (const field of investorFields) {
      if (!body.investor[field as keyof typeof body.investor]) {
        return NextResponse.json(
          { success: false, error: `Missing required investor field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate percentage share
    if (body.investor.percentageShare < 0 || body.investor.percentageShare > 100) {
      return NextResponse.json(
        { success: false, error: 'Percentage share must be between 0 and 100' },
        { status: 400 }
      );
    }

    // Validate investment amount
    if (body.investor.investmentAmount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Investment amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.investor.emailAddress)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate CNIC format (Pakistani CNIC: 00000-0000000-0)
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    if (!cnicRegex.test(body.investor.cnic)) {
      return NextResponse.json(
        { success: false, error: 'Invalid CNIC format. Use format: 00000-0000000-0' },
        { status: 400 }
      );
    }

    // Check if batch number already exists
    const existingBatch = await Batch.findOne({ batchNo: body.batchNo });
    if (existingBatch) {
      return NextResponse.json(
        { success: false, error: 'Batch number already exists' },
        { status: 409 }
      );
    }

    // Check if investor CNIC already exists in another batch
    const existingInvestor = await Batch.findOne({ 'investor.cnic': body.investor.cnic });
    if (existingInvestor) {
      return NextResponse.json(
        { success: false, error: 'Investor with this CNIC already exists in another batch' },
        { status: 409 }
      );
    }

    // Create new batch
    const batch = new Batch(body);
    const savedBatch = await batch.save();

    return NextResponse.json({
      success: true,
      data: savedBatch,
      message: 'Batch created successfully'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating batch:', error);
    
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
      const field = Object.keys(error.keyPattern)[0];
      if (field === 'batchNo') {
        return NextResponse.json(
          { success: false, error: 'Batch number already exists' },
          { status: 409 }
        );
      } else if (field === 'investor.cnic') {
        return NextResponse.json(
          { success: false, error: 'Investor with this CNIC already exists' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, error: 'Duplicate key error', field },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: `Failed to create batch: ${error.message}` },
      { status: 500 }
    );
  }
}
