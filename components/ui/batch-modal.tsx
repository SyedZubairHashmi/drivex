"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, X, Upload, FileText, Loader2 } from "lucide-react";
import { batchAPI } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BatchData {
  batchNumber: string;
  investorName: string;
  contactNumber: string;
  emailAddress: string;
  investorId: string;
  cnic: string;
  investmentAmount: string;
  percentageShare: string;
  paymentDate: string;
  paymentMethod: string;
  salesAgreement: File | null;
}

interface ValidationErrors {
  [key: string]: string;
}

export function BatchModal({ isOpen, onClose }: BatchModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [batchData, setBatchData] = useState<BatchData>({
    batchNumber: "",
    investorName: "",
    contactNumber: "",
    emailAddress: "",
    investorId: "",
    cnic: "",
    investmentAmount: "",
    percentageShare: "",
    paymentDate: "",
    paymentMethod: "",
    salesAgreement: null,
  });

  // Function to calculate next batch number
  const calculateNextBatchNumber = async () => {
    try {
      const response = await batchAPI.getAll();
      if (response.success && response.data) {
        const existingBatches = response.data;
        
        // Extract batch numbers and find the highest one
        const batchNumbers = existingBatches
          .map((batch: any) => {
            const batchNo = batch.batchNo;
            // Handle simple formats like "04", "05", "06" or complex formats like "BATCH-2023-001"
            if (/^\d{1,2}$/.test(batchNo)) {
              // Simple format like "04", "5", "12"
              return parseInt(batchNo);
            } else {
              // Complex format like "BATCH-2023-001", "Batch 01", etc.
              const match = batchNo.match(/(\d+)/);
              return match ? parseInt(match[1]) : 0;
            }
          })
          .filter((num: number) => num > 0);
        
        const nextNumber = batchNumbers.length > 0 ? Math.max(...batchNumbers) + 1 : 1;
        const formattedNumber = nextNumber.toString().padStart(2, '0'); // Format as "04"
        
        setBatchData(prev => ({
          ...prev,
          batchNumber: formattedNumber
        }));
      }
    } catch (error) {
      console.error("Error calculating next batch number:", error);
      // Fallback to "01" if there's an error
      setBatchData(prev => ({
        ...prev,
        batchNumber: "01"
      }));
    }
  };

  // Calculate next batch number when modal opens
  useEffect(() => {
    if (isOpen) {
      calculateNextBatchNumber();
    }
  }, [isOpen]);

  const handleInputChange = (field: keyof BatchData, value: string) => {
    setBatchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (file: File) => {
    setBatchData(prev => ({
      ...prev,
      salesAgreement: file
    }));
  };



  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};

    if (step === 1) {
      if (!batchData.batchNumber.trim()) {
        newErrors.batchNumber = "Batch number is required";
      }
      // No need to validate batch number format since it's auto-generated
    }

    if (step === 2) {
      if (!batchData.investorName.trim()) {
        newErrors.investorName = "Investor name is required";
      }
      if (!batchData.contactNumber.trim()) {
        newErrors.contactNumber = "Contact number is required";
      }
      if (!batchData.emailAddress.trim()) {
        newErrors.emailAddress = "Email address is required";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(batchData.emailAddress)) {
          newErrors.emailAddress = "Invalid email format";
        }
      }
      if (!batchData.investorId.trim()) {
        newErrors.investorId = "Investor ID is required";
      }
      if (!batchData.cnic.trim()) {
        newErrors.cnic = "CNIC is required";
      } else {
        const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
        if (!cnicRegex.test(batchData.cnic)) {
          newErrors.cnic = "Invalid CNIC format. Use: 00000-0000000-0";
        }
      }
      if (!batchData.investmentAmount.trim()) {
        newErrors.investmentAmount = "Investment amount is required";
      } else if (parseFloat(batchData.investmentAmount) <= 0) {
        newErrors.investmentAmount = "Investment amount must be greater than 0";
      }
      if (!batchData.percentageShare.trim()) {
        newErrors.percentageShare = "Percentage share is required";
      } else {
        const percentage = parseFloat(batchData.percentageShare);
        if (percentage < 0 || percentage > 100) {
          newErrors.percentageShare = "Percentage share must be between 0 and 100";
        }
      }
      if (!batchData.paymentDate.trim()) {
        newErrors.paymentDate = "Payment date is required";
      }
      if (!batchData.paymentMethod.trim()) {
        newErrors.paymentMethod = "Payment method is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSaveAndClose = async () => {
    try {
      setIsLoading(true);
      
      // Prepare data for API
      const apiData = {
        batchNo: batchData.batchNumber, // Save as simple "04", "05", "06" format
        investor: {
          name: batchData.investorName,
          contactNumber: batchData.contactNumber,
          emailAddress: batchData.emailAddress,
          investorId: batchData.investorId,
          cnic: batchData.cnic,
          investmentAmount: parseFloat(batchData.investmentAmount),
          percentageShare: parseFloat(batchData.percentageShare),
          paymentDate: new Date(batchData.paymentDate).toISOString(),
          paymentMethod: batchData.paymentMethod,
        },
        supportDocuments: batchData.salesAgreement ? [
          {
            documentType: "pdf",
            fileName: batchData.salesAgreement.name,
            fileUrl: "https://example.com/documents/" + batchData.salesAgreement.name,
          }
        ] : [],
        notes: `Batch created via UI - ${new Date().toLocaleDateString()}`,
      };

      console.log("Saving batch data:", apiData);
      
      // Call the API
      const response = await batchAPI.create(apiData);
      
      if (response.success) {
        console.log("Batch created successfully:", response.data);
        
        // Close modal and reset
        onClose();
        setCurrentStep(1);
        setErrors({});
        // Reset form but keep the calculated batch number
        setBatchData(prev => ({
          ...prev,
          investorName: "",
          contactNumber: "",
          emailAddress: "",
          investorId: "",
          cnic: "",
          investmentAmount: "",
          percentageShare: "",
          paymentDate: "",
          paymentMethod: "",
          salesAgreement: null,
        }));
      } else {
        console.error("Failed to create batch:", response.error);
        setErrors({ general: response.error || "Failed to create batch" });
      }
    } catch (error: any) {
      console.error("Error saving batch:", error);
      setErrors({ general: error.message || "An error occurred while creating the batch" });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "#000000CC" }}>
      <div 
        className="bg-white rounded-xl border border-gray-200 p-6"
        style={{
          width: "520px",
          height: currentStep === 1 ? "368px" : currentStep === 2 ? "638px" : currentStep === 3 ? "672px" : "409px",
          borderRadius: "12px",
          opacity: 1,
          gap: "40px",
          borderWidth: "1px",
          padding: "24px",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <span className="text-sm text-gray-600">STEP {currentStep}/3</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step 1: Batch Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Batch Details</h2>
              <p className="text-gray-600">
                {batchData.batchNumber ? 
                  `Next available batch number: ${batchData.batchNumber}` : 
                  "Calculating next batch number..."
                }
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Batch Number</label>
              <div className="flex items-center gap-2">
                <Input
                  value={batchData.batchNumber}
                  readOnly
                  className={`flex-1 bg-gray-50 cursor-not-allowed ${errors.batchNumber ? "border-red-500" : ""}`}
                  style={{ color: '#6B7280' }}
                />
                <div className="w-8 h-8 border-2 border-dotted border-gray-300 rounded flex items-center justify-center">
                  <span className="text-blue-500 text-xs">✓</span>
                </div>
              </div>
              {errors.batchNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.batchNumber}</p>
              )}
            </div>

            <Button
              onClick={handleNext}
              className="w-full"
              style={{ backgroundColor: "#00674F" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Save & Continue"
              )}
            </Button>
          </div>
        )}

        {/* Step 2: Batch Investor */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Batch Investor</h2>
              <p className="text-gray-600">Enter specific details for create a new batch</p>
            </div>
            
            {/* Error Display */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {errors.general}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investor Name</label>
                <Input
                  value={batchData.investorName}
                  onChange={(e) => handleInputChange('investorName', e.target.value)}
                  placeholder="Enter Investor Name"
                  className={errors.investorName ? "border-red-500" : ""}
                />
                {errors.investorName && (
                  <p className="text-red-500 text-xs mt-1">{errors.investorName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <Input
                  value={batchData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  placeholder="Enter Contact Number"
                  className={errors.contactNumber ? "border-red-500" : ""}
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <Input
                  value={batchData.emailAddress}
                  onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                  placeholder="Enter Email Address"
                  className={errors.emailAddress ? "border-red-500" : ""}
                />
                {errors.emailAddress && (
                  <p className="text-red-500 text-xs mt-1">{errors.emailAddress}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investor ID</label>
                <Input
                  value={batchData.investorId}
                  onChange={(e) => handleInputChange('investorId', e.target.value)}
                  placeholder="Enter Investor ID"
                  className={errors.investorId ? "border-red-500" : ""}
                />
                {errors.investorId && (
                  <p className="text-red-500 text-xs mt-1">{errors.investorId}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CNIC</label>
                <Input
                  value={batchData.cnic}
                  onChange={(e) => handleInputChange('cnic', e.target.value)}
                  placeholder="00000-0000000-0"
                  className={errors.cnic ? "border-red-500" : ""}
                />
                {errors.cnic && (
                  <p className="text-red-500 text-xs mt-1">{errors.cnic}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount</label>
                <Input
                  value={batchData.investmentAmount}
                  onChange={(e) => handleInputChange('investmentAmount', e.target.value)}
                  placeholder="Enter Investment Amount"
                  type="number"
                  className={errors.investmentAmount ? "border-red-500" : ""}
                />
                {errors.investmentAmount && (
                  <p className="text-red-500 text-xs mt-1">{errors.investmentAmount}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Percentage Share</label>
                <Input
                  value={batchData.percentageShare}
                  onChange={(e) => handleInputChange('percentageShare', e.target.value)}
                  placeholder="Enter Percentage Share"
                  type="number"
                  className={errors.percentageShare ? "border-red-500" : ""}
                />
                {errors.percentageShare && (
                  <p className="text-red-500 text-xs mt-1">{errors.percentageShare}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Date</label>
                <Input
                  value={batchData.paymentDate}
                  onChange={(e) => handleInputChange('paymentDate', e.target.value)}
                  placeholder="Enter Payment Date"
                  type="date"
                  className={errors.paymentDate ? "border-red-500" : ""}
                />
                {errors.paymentDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.paymentDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <Select value={batchData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                  <SelectTrigger className={errors.paymentMethod ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                  </SelectContent>
                </Select>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>
                )}
              </div>
            </div>

            <Button
              onClick={handleNext}
              className="w-full"
              style={{ backgroundColor: "#00674F" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Save & Continue"
              )}
            </Button>
          </div>
        )}

        {/* Step 3: Supporting Documents */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Supporting Documents</h2>
              <p className="text-gray-600">Please provide Investor details</p>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sales Agreement PDF</h3>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                className="hidden"
                id="sales-agreement"
              />
              <label
                htmlFor="sales-agreement"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                Browse Files
              </label>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">
                Please upload any relevant files to verify and record the sale:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Sales Agreement (PDF)</li>
                <li>• Payment Receipt (Image or PDF)</li>
                <li>• Customer ID Copy (Image or PDF)</li>
              </ul>
            </div>

            <div className="text-sm text-gray-500 italic">
              Note: These documents are optional but recommended for record accuracy.
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleNext}
                className="flex-1"
                style={{ backgroundColor: "#00674F" }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Add Other Investor"
                )}
              </Button>
              <Button
                onClick={handleSaveAndClose}
                className="flex-1 bg-black hover:bg-gray-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Save & close"
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {currentStep === 4 && (
          <div className="space-y-6 text-center">
            <div>
                              <h2 className="text-xl font-semibold text-gray-900 mb-4">Batch {batchData.batchNumber} Created Successfully!</h2>
              
              {/* Celebration Graphic */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-purple-200 rounded-full"></div>
                <div className="absolute inset-4 flex items-center justify-center">
                  <div className="relative">
                    {/* Party popper */}
                    <div className="w-16 h-16 border-4 border-green-600 rounded-full relative">
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-600 transform rotate-45"></div>
                    </div>
                    {/* Confetti */}
                    <div className="absolute -top-4 -right-4 w-2 h-2 bg-green-600 rounded-full"></div>
                    <div className="absolute -top-2 -right-6 w-1 h-1 bg-green-600 rounded-full"></div>
                    <div className="absolute top-2 -right-8 w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    <div className="absolute top-4 -right-6 w-1 h-1 bg-purple-300 rounded-full"></div>
                    <div className="absolute top-6 -right-4 w-1.5 h-1.5 bg-purple-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleSaveAndClose}
              className="w-full"
              style={{ 
                backgroundColor: "#00674F",
                width: "472px",
                height: "45px",
                gap: "12px"
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Save & close"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
