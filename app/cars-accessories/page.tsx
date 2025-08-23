"use client";

import Image from "next/image";
import accessoriesData from "./data";

export default function CarAccessoriesCollectionPage() {
  return (
    <div className="p-24">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Car Accessories 🛠️</h1>
        <p className="mt-4 text-lg text-gray-600">
          Yahan pe sari premium car accessories ki listings available hain.
        </p>
      </div>

      {/* Accessories Grid (sirf 12 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {accessoriesData.slice(0, 12).map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 text-left"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={280}
              height={180}
              className="rounded-lg border border-gray-300 p-1 object-cover"
            />

            <h2 className="text-lg font-semibold mt-3">{item.title}</h2>
            <p className="text-gray-500">{item.sub_title}</p>

            <div className="flex flex-col gap-1 mt-3 text-sm text-gray-600">
              <span>✅ {item.feature1}</span>
              <span>✅ {item.feature2}</span>
              <span>✅ {item.feature3}</span>
            </div>

            <div className="mt-4">
              <div className="text-gray-500 text-xs">{item.price}</div>
              <div className="flex items-center gap-3 mt-1">
                <span className="font-bold text-lg text-green-700">
                  {item.amount_price}
                </span>
                <span className="text-gray-400 line-through">{item.sub_price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Pagination UI (static only) */}
      <nav
        className="mt-10 flex items-center justify-center gap-2 select-none"
        aria-label="Pagination"
      >
        <button
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled
        >
          Previous
        </button>

        <button className="px-3 py-2 rounded-lg border bg-green-600 text-white">
          1
        </button>
        <button className="px-3 py-2 rounded-lg border hover:bg-gray-100">2</button>
        <button className="px-3 py-2 rounded-lg border hover:bg-gray-100">3</button>

        <button className="px-4 py-2 rounded-lg border hover:bg-gray-100">
          Next
        </button>
      </nav>
    </div>
  );
}
