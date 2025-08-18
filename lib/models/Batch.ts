import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    batchNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    investor: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      contactNumber: {
        type: String,
        required: true,
        trim: true,
      },
      emailAddress: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      investorId: {
        type: String,
        required: true,
        trim: true,
      },
      cnic: {
        type: String,
        required: true,
        trim: true,
      },
      investmentAmount: {
        type: Number,
        required: true,
        min: 0,
      },
      percentageShare: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      paymentDate: {
        type: Date,
        required: true,
      },
      paymentMethod: {
        type: String,
        enum: ["cash", "bank_transfer", "cheque", "online"],
        required: true,
      },
    },
    supportDocuments: [
      {
        documentType: {
          type: String,
          enum: ["pdf", "image"],
          required: true,
        },
        fileName: {
          type: String,
          required: true,
        },
        fileUrl: {
          type: String,
          required: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "completed", "pending", "cancelled"],
      default: "pending",
    },
    totalCars: {
      type: Number,
      default: 0,
      min: 0,
    },
    soldCars: {
      type: Number,
      default: 0,
      min: 0,
    },
    revenue: {
      type: Number,
      default: 0,
      min: 0,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
batchSchema.index({ batchNo: 1 });
batchSchema.index({ "investor.emailAddress": 1 });
batchSchema.index({ "investor.cnic": 1 });
batchSchema.index({ status: 1 });

export default mongoose.models.Batch || mongoose.model("Batch", batchSchema);
