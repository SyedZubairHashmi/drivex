"use client";

import Image from "next/image";
import { FaUser, FaGasPump, FaTachometerAlt } from "react-icons/fa";
import { Car, carsData } from "./data";

export default function CarsCollectionPage() {
  function CarCard({ car }: { car: Car }) {
    return (
      <div className="border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 text-left bg-white">
        <Image
          src={car.image}
          alt={car.title}
          width={280}
          height={180}
          className="rounded-lg border border-gray-300 p-1 object-cover w-full h-44 sm:h-48"
        />
        <h2 className="text-lg font-semibold mt-3 truncate">{car.title}</h2>
        <p className="text-gray-500 truncate">{car.sub_title}</p>

        <div className="flex justify-between mt-3 text-sm text-gray-600 flex-wrap gap-2">
          <span className="flex items-center gap-1">
            <FaUser className="text-gray-500" />
            {car.num} Seats
          </span>
          <span className="flex items-center gap-1">
            <FaGasPump className="text-gray-500" />
            {car.num2}
          </span>
          <span className="flex items-center gap-1">
            <FaTachometerAlt className="text-gray-500" />
            {car.num3}
          </span>
        </div>

        <div className="mt-4">
          <div className="text-gray-500 text-xs truncate">{car.price}</div>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="font-bold text-lg text-green-700">{car.amount_price}</span>
            <span className="text-gray-400 line-through">{car.sub_price}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 md:p-16 bg-gray-50">
      {/* Heading */}
      <div className="text-center mb-10 px-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Cars Collection 🚗</h1>
        <p className="mt-2 sm:mt-4 text-sm sm:text-lg text-gray-600">
          Yahan pe sari luxury cars ki listings available hain.
        </p>
      </div>

      {/* Grid */}
      <div className="space-y-6">
        {Array.from({ length: Math.ceil(carsData.length / 4) }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto"
          >
            {carsData.slice(rowIndex * 4, rowIndex * 4 + 4).map((car, index) => (
              <CarCard key={index} car={car} />
            ))}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 sm:mt-8 space-x-1 sm:space-x-2 overflow-x-auto py-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded-lg whitespace-nowrap ${
              i === 1 ? "bg-green-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
