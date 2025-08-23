"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import carSectionData from "@/app/carSection/data";
import { FaUser, FaGasPump, FaTachometerAlt } from "react-icons/fa";
import { useState } from "react";

const CarDetailPage = () => {
  const params = useParams();
  const carIdStr = Array.isArray(params.id) ? params.id[0] : params.id;
  const carId = parseInt(carIdStr);
  const car = carSectionData.find((c) => c.id === carId);
  const [selectedImage, setSelectedImage] = useState(car?.images[0]);

  if (!car) return <div className="text-center mt-10 text-xl">Car not found</div>;

  return (
    <div className="max-w-[800px] mx-auto px-4 py-6">
      {/* Main Car Image */}
      <div className="rounded-lg border border-gray-300 p-1 mb-3">
        <Image
          src={selectedImage!}
          alt={car.title}
          width={600}
          height={400}
          className="w-full object-cover rounded-lg"
        />
      </div>

      {/* Thumbnail Row */}
      <div className="flex gap-2 overflow-x-auto mb-4">
        {car.images.map((img, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`border rounded p-1 cursor-pointer ${
              selectedImage === img ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <Image
              src={img}
              alt={`thumb-${index}`}
              width={100}
              height={60}
              className="rounded object-cover"
            />
          </div>
        ))}
      </div>

      {/* Car Title & Subtitle */}
      <h1 className="text-3xl font-bold mt-4">{car.title}</h1>
      <p className="text-gray-600 mt-2">{car.sub_title}</p>

      {/* Car Details */}
      <div className="flex gap-4 mt-3 text-gray-600 flex-wrap">
        <span className="flex items-center gap-1">
          <FaUser /> {car.num} Seats
        </span>
        <span className="flex items-center gap-1">
          <FaGasPump /> {car.num2}
        </span>
        <span className="flex items-center gap-1">
          <FaTachometerAlt /> {car.num3}
        </span>
      </div>

      {/* Car Price */}
      <div className="mt-4">
        <span className="text-green-700 font-bold text-xl">{car.amount_price}</span>
        <span className="text-gray-400 line-through ml-2">{car.sub_price}</span>
        <p className="text-gray-500 mt-2">{car.price}</p>
      </div>
    </div>
  );
};

export default CarDetailPage;
