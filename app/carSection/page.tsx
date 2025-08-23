"use client";

import Image from "next/image";
import carSectionData from "@/app/HomePage/data";
import { FaUser, FaGasPump, FaTachometerAlt } from "react-icons/fa";

const CarSection = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
      <div className="pt-6 pb-6 bg-white">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
          <div className="flex flex-col">
            <button className="text-green-70 text-[44px] font-bold hover:underline mb-1 text-left">
              Discover More
            </button>
            <div className="text-gray-600 text-[20px]">
              These are the luxury collection we have
            </div>
          </div>
          <button className="text-black hover:underline border border-gray-700 rounded-2xl px-4 py-1 mt-2 sm:mt-0 text-[20px]">
            View More
          </button>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
          {carSectionData.map((car, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-[24px] shadow-sm hover:shadow-md transition-shadow duration-300 text-left w-[314px] h-[426px] mx-auto p-4"
            >
              <Image
                src={car.image}
                alt={car.title}
                width={314}
                height={200}
                className="rounded-[18px] border border-gray-300 p-1 object-cover w-full h-[200px]"
              />

              <h2 className="text-[24px] font-bold mt-3">{car.title}</h2>
              <p className="text-[24px] text-gray-500">{car.sub_title}</p>

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
                <div className="text-gray-500 text-[14px]">{car.price}</div>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="font-bold text-[24px] text-green-700">
                    {car.amount_price}
                  </span>
                  <span className="text-gray-400 line-through">
                    {car.sub_price}
                  </span>
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
