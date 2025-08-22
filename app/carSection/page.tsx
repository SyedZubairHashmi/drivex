"use client";

import Image from "next/image";
import carSectionData from "@/app/HomePage/data";
import { FaUser, FaGasPump, FaTachometerAlt } from "react-icons/fa";

const CarSection = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
      <div className="pt-6 pb-6 bg-white">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
          <div className="flex flex-col">
            <button className="text-green-700 font-semibold hover:underline mb-1 text-left">
              Discover More
            </button>
            <div className="text-gray-600 text-sm">
              These are the luxury collection we have
            </div>
          </div>
          <button className="text-black hover:underline border border-gray-700 rounded-2xl px-4 py-1 mt-2 sm:mt-0">
            View More
          </button>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {carSectionData.map((car, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 text-left"
            >
              <Image
                src={car.image}
                alt={car.title}
                width={280}
                height={180}
                className="rounded-lg border border-gray-300 p-1 object-cover w-full h-48"
              />

              <h2 className="text-lg font-semibold mt-3">{car.title}</h2>
              <p className="text-gray-500">{car.sub_title}</p>

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
                <div className="text-gray-500 text-xs">{car.price}</div>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="font-bold text-lg text-green-700">{car.amount_price}</span>
                  <span className="text-gray-400 line-through">{car.sub_price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarSection;
