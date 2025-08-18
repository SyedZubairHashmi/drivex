import { Document } from 'mongoose';

// Batch Types
export interface IBatch extends Document {
  batchNo: string;
  investor: {
    name: string;
    contactNumber: string;
    emailAddress: string;
    investorId: string;
    cnic: string;
    investmentAmount: number;
    percentageShare: number;
    paymentDate: Date;
    paymentMethod: 'cash' | 'bank_transfer' | 'cheque' | 'online';
  };
  supportDocuments: Array<{
    documentType: 'pdf' | 'image';
    fileName: string;
    fileUrl: string;
    uploadedAt: Date;
  }>;
  status: 'active' | 'completed' | 'pending' | 'cancelled';
  totalCars: number;
  soldCars: number;
  revenue: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Car Types
export interface ICar extends Document {
  carName: string;
  company: string;
  engineNumber: string;
  chasisNumber: string;
  auctionGrade: number;
  importYear: number;
  assembly: 'local' | 'import';
  engineCapacity: string;
  interiorColor: string;
  mileage: string;
  keywords: string[];
  status: 'available' | 'in_transit' | 'warehouse' | 'sold' | 'reserved';
  color: string;
  deliveryTimeframe: string;
  batchNo: string;
  description: string;
  financing: {
    auctionPrice: number;
    auctionTaxes: number;
    inlandCharges: number;
    shipmentCharges: number;
    variantDuty: number;
    passportCharges: number;
    serviceCharges: number;
    transportCharges: number;
    repairCharges: number;
    miscellaneousCharges: number;
  };
  saleInfo?: {
    soldPrice?: number;
    soldDate?: Date;
    buyerInfo?: {
      name?: string;
      contactNumber?: string;
      emailAddress?: string;
      cnic?: string;
    };
  };
  images: {
    coverPhoto: string;
    auctionSheet: string;
    carPictures: string[];
  };
  notes?: string;
  isFeatured: boolean;
  totalCost?: number; // Virtual field
  createdAt: Date;
  updatedAt: Date;
}

// Input Types for API
export interface CreateBatchInput {
  batchNo: string;
  investor: {
    name: string;
    contactNumber: string;
    emailAddress: string;
    investorId: string;
    cnic: string;
    investmentAmount: number;
    percentageShare: number;
    paymentDate: Date;
    paymentMethod: 'cash' | 'bank_transfer' | 'cheque' | 'online';
  };
  supportDocuments?: Array<{
    documentType: 'pdf' | 'image';
    fileName: string;
    fileUrl: string;
  }>;
  notes?: string;
}

export interface CreateCarInput {
  carName: string;
  company: string;
  engineNumber: string;
  chasisNumber: string;
  auctionGrade: number;
  importYear: number;
  assembly: 'local' | 'import';
  engineCapacity: string;
  interiorColor: string;
  mileage: string;
  keywords?: string[];
  color: string;
  deliveryTimeframe: string;
  batchNo: string;
  description: string;
  financing: {
    auctionPrice: number;
    auctionTaxes: number;
    inlandCharges: number;
    shipmentCharges: number;
    variantDuty: number;
    passportCharges: number;
    serviceCharges: number;
    transportCharges: number;
    repairCharges: number;
    miscellaneousCharges: number;
  };
  images: {
    coverPhoto: string;
    auctionSheet: string;
    carPictures: string[];
  };
  notes?: string;
  isFeatured?: boolean;
}

export interface UpdateCarInput extends Partial<CreateCarInput> {
  status?: 'available' | 'in_transit' | 'warehouse' | 'sold' | 'reserved';
  saleInfo?: {
    soldPrice: number;
    soldDate: Date;
    buyerInfo: {
      name: string;
      contactNumber: string;
      emailAddress: string;
      cnic: string;
    };
  };
}
