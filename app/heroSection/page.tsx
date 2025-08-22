"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function HeroSection() {
  const [city, setCity] = useState("All Cities");
  const [price, setPrice] = useState("Price Range");

  return (
    <section
      className="relative h-[90vh] w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/heroCar.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[50px] font-semibold leading-tight">
          Experience the thrill of driving <br /> the finest cars with us!
        </h1>

        <p className="mt-3 text-lg text-gray-200">
          With thousands of cars, we have just the right one for you
        </p>

        {/* Search Bar Row */}
        <div className="mt-10 w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* White Rounded Box (Inputs + Dropdowns) */}
          <div className="flex flex-col sm:flex-row bg-white rounded-full shadow-lg px-3 py-4 sm:py-1 gap-4 sm:gap-6 w-full max-w-full sm:max-w-[900px] items-center">
            
            {/* Input Field */}
            <input
              type="text"
              placeholder="Car Model"
              className="flex-1 px-4 py-2 rounded-full outline-none text-lg text-black placeholder:text-gray-400 bg-white w-full"
            />

            {/* City Dropdown */}
            <div className="relative w-full sm:w-auto">
              <button className="flex items-center justify-between w-full sm:w-auto px-4 py-2 rounded-full bg-gray-100 text-gray-700 border border-gray-300 hover:border-green-600 transition">
                {city} <FaChevronDown className="ml-2 text-sm text-gray-500" />
              </button>
            </div>

            {/* Price Dropdown */}
            <div className="relative w-full sm:w-auto">
              <button className="flex items-center justify-between w-full sm:w-auto px-4 py-2 rounded-full bg-gray-100 text-gray-700 border border-gray-300 hover:border-green-600 transition">
                {price} <FaChevronDown className="ml-2 text-sm text-gray-500" />
              </button>
            </div>
          </div>

          {/* Search Button */}
          <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-full shadow-lg font-medium transition w-full sm:w-auto">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
