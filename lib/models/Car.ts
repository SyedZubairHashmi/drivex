import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    // Basic Car Information
    carName: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    engineNumber: {
      type: String,
      required: true,
      trim: true,
    },
    chasisNumber: {
      type: String,
      required: true,
      trim: true,
    },
    auctionGrade: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    importYear: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear() + 1,
    },
    assembly: {
      type: String,
      enum: ["local", "import"],
      required: true,
    },
    engineCapacity: {
      type: String,
      required: true,
      trim: true,
    },
    interiorColor: {
      type: String,
      required: true,
      trim: true,
    },
    mileage: {
      type: String,
      required: true,
      trim: true,
    },
    keywords: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["available", "in_transit", "warehouse", "sold", "reserved"],
      default: "available",
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    deliveryTimeframe: {
      type: String,
      required: true,
      trim: true,
    },
    batchNo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Financial Information
    financing: {
      auctionPrice: {
        type: Number,
        required: true,
        min: 0,
      },
      auctionTaxes: {
        type: Number,
        required: true,
        min: 0,
      },
      inlandCharges: {
        type: Number,
        required: true,
        min: 0,
      },
      shipmentCharges: {
        type: Number,
        required: true,
        min: 0,
      },
      variantDuty: {
        type: Number,
        required: true,
        min: 0,
      },
      passportCharges: {
        type: Number,
        required: true,
        min: 0,
      },
      serviceCharges: {
        type: Number,
        required: true,
        min: 0,
      },
      transportCharges: {
        type: Number,
        required: true,
        min: 0,
      },
      repairCharges: {
        type: Number,
        required: true,
        min: 0,
      },
      miscellaneousCharges: {
        type: Number,
        required: true,
        min: 0,
      },
    },

    // Sale Information (when car is sold)
    saleInfo: {
      soldPrice: {
        type: Number,
        min: 0,
      },
      soldDate: {
        type: Date,
      },
      buyerInfo: {
        name: {
          type: String,
          trim: true,
        },
        contactNumber: {
          type: String,
          trim: true,
        },
        emailAddress: {
          type: String,
          trim: true,
          lowercase: true,
        },
        cnic: {
          type: String,
          trim: true,
        },
      },
    },

    // Images and Documents
    images: {
      coverPhoto: {
        type: String,
        required: true,
        trim: true,
      },
      auctionSheet: {
        type: String,
        required: true,
        trim: true,
      },
      carPictures: [
        {
          type: String,
          required: true,
          trim: true,
        },
      ],
    },

    // Additional Information
    notes: {
      type: String,
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
carSchema.index({ batchNo: 1 });
carSchema.index({ status: 1 });
carSchema.index({ company: 1 });
carSchema.index({ auctionGrade: 1 });
carSchema.index({ importYear: 1 });
carSchema.index({ isFeatured: 1 });
carSchema.index({ "financing.auctionPrice": 1 });

// Virtual for total cost calculation
carSchema.virtual("totalCost").get(function () {
  const financing = this.financing;
  if (!financing) return 0;
  
  return (
    financing.auctionPrice +
    financing.auctionTaxes +
    financing.inlandCharges +
    financing.shipmentCharges +
    financing.variantDuty +
    financing.passportCharges +
    financing.serviceCharges +
    financing.transportCharges +
    financing.repairCharges +
    financing.miscellaneousCharges
  );
});

// Ensure virtuals are serialized
carSchema.set("toJSON", { virtuals: true });
carSchema.set("toObject", { virtuals: true });

// Validation for minimum 4 car pictures
carSchema.pre("save", function (next) {
  if (this.images && this.images.carPictures && this.images.carPictures.length < 4) {
    next(new Error("At least 4 car pictures are required"));
  } else {
    next();
  }
});

export default mongoose.models.Car || mongoose.model("Car", carSchema);
