"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BatchHeader } from "@/components/ui/batch-header";
import { CarTable } from "@/components/ui/car-table";
import { AddCarModal } from "@/components/ui/add-car-modal";
import { CarDetailsModal } from "@/components/ui/car-details-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import type { Car as CarType } from "@/types";

interface BatchCarsSectionProps {
  batchTitle: string; // e.g. "Batch 05"
  batchNumber: string; // e.g. "05"
  cars: CarType[];
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function BatchCarsSection({ 
  batchTitle, 
  batchNumber, 
  cars, 
  isExpanded: externalIsExpanded,
  onToggle: externalOnToggle
}: BatchCarsSectionProps) {
  const router = useRouter();
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [showCarDetails, setShowCarDetails] = useState(false);
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [internalIsExpanded, setInternalIsExpanded] = useState(true);

  // Use external state if provided, otherwise use internal state
  const isExpanded = externalIsExpanded !== undefined ? externalIsExpanded : internalIsExpanded;
  const handleToggle = externalOnToggle || (() => setInternalIsExpanded(!internalIsExpanded));

  // Use all cars passed from parent (no limit)
  const filteredCars = cars;
  console.log(filteredCars)

  const handleAddNewCar = (carData: any) => {
    console.log("Add new car:", carData);
    setShowAddCarModal(false);
  };

  const handleEditCar = (car: CarType) => {
    console.log("Edit car:", car);
  };

  const handleDeleteCar = (car: CarType) => {
    console.log("Delete car:", car);
  };

  const handleViewCar = (car: CarType) => {
    setSelectedCar(car);
    setShowCarDetails(true);
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <BatchHeader
        title={batchTitle}
        onAddNew={() => setShowAddCarModal(true)}
        showFilters={true}
        isExpanded={isExpanded}
        onToggle={handleToggle}
        batchNumber={batchNumber}
      />

      {/* Table */}
      {isExpanded && (
        <div className="mt-3">
          <CarTable
            cars={filteredCars}
            batchNumber={batchNumber}
            onDelete={handleDeleteCar}
            onView={handleViewCar}
          />
        </div>
      )}

      {/* Add Button */}
      {isExpanded && (
        <div className="flex w-full justify-center mt-2 border-gray-200">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
            onClick={() => router.push(`/cars/inventory/${batchNumber}/add-car`)}
          >
            <Plus className="h-4 w-4" />
            Add New Car
          </Button>
        </div>
      )}

      {/* Modals */}
      {/* <AddCar Modal
        open={showAddCarModal}
        onOpenChange={setShowAddCarModal}
        onSubmit={handleAddNewCar}
      /> */}
      <CarDetailsModal
        car={selectedCar}
        open={showCarDetails}
        onOpenChange={setShowCarDetails}
      />
    </div>
  );
}
