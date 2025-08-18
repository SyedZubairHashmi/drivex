// API utility functions for frontend use

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

// Generic API request function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Car API functions
export const carAPI = {
  // Get all cars with optional filters
  getAll: async (filters?: {
    batchNo?: string;
    status?: string;
    company?: string;
    auctionGrade?: number;
    isFeatured?: boolean;
    limit?: number;
    page?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const endpoint = `/cars${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest(endpoint);
  },

  // Get a specific car by ID
  getById: async (id: string) => {
    return apiRequest(`/cars/${id}`);
  },

  // Create a new car
  create: async (carData: any) => {
    return apiRequest('/cars', {
      method: 'POST',
      body: JSON.stringify(carData),
    });
  },

  // Update a car
  update: async (id: string, carData: any) => {
    return apiRequest(`/cars/${id}`, {
      method: 'PUT',
      body: JSON.stringify(carData),
    });
  },

  // Delete a car
  delete: async (id: string) => {
    return apiRequest(`/cars/${id}`, {
      method: 'DELETE',
    });
  },
};

// Batch API functions
export const batchAPI = {
  // Get all batches with optional filters
  getAll: async (filters?: {
    status?: string;
    investorEmail?: string;
    investorCnic?: string;
    limit?: number;
    page?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const endpoint = `/batches${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest(endpoint);
  },

  // Get a specific batch by ID
  getById: async (id: string) => {
    return apiRequest(`/batches/${id}`);
  },

  // Create a new batch
  create: async (batchData: any) => {
    return apiRequest('/batches', {
      method: 'POST',
      body: JSON.stringify(batchData),
    });
  },

  // Update a batch
  update: async (id: string, batchData: any) => {
    return apiRequest(`/batches/${id}`, {
      method: 'PUT',
      body: JSON.stringify(batchData),
    });
  },

  // Delete a batch
  delete: async (id: string) => {
    return apiRequest(`/batches/${id}`, {
      method: 'DELETE',
    });
  },
};

// Utility functions for data formatting
export const formatCarData = (car: any) => {
  return {
    id: car._id,
    carName: car.carName,
    company: car.company,
    engineNumber: car.engineNumber,
    chasisNumber: car.chasisNumber,
    auctionGrade: car.auctionGrade,
    importYear: car.importYear,
    assembly: car.assembly,
    engineCapacity: car.engineCapacity,
    interiorColor: car.interiorColor,
    mileage: car.mileage,
    keywords: car.keywords || [],
    status: car.status,
    color: car.color,
    deliveryTimeframe: car.deliveryTimeframe,
    batchNo: car.batchNo,
    description: car.description,
    financing: car.financing,
    saleInfo: car.saleInfo,
    images: car.images,
    notes: car.notes,
    isFeatured: car.isFeatured,
    totalCost: car.totalCost,
    createdAt: car.createdAt,
    updatedAt: car.updatedAt,
  };
};

export const formatBatchData = (batch: any) => {
  return {
    id: batch._id,
    batchNo: batch.batchNo,
    investor: batch.investor,
    supportDocuments: batch.supportDocuments || [],
    status: batch.status,
    totalCars: batch.totalCars,
    soldCars: batch.soldCars,
    revenue: batch.revenue,
    notes: batch.notes,
    createdAt: batch.createdAt,
    updatedAt: batch.updatedAt,
  };
};
