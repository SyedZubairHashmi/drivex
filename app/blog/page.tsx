"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import blogData from "./blogData";

const ITEMS_PER_PAGE = 6;

export default function BlogSection() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogData.length / ITEMS_PER_PAGE);

  const displayedStories = blogData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-green-900 text-white w-full h-[400px] flex flex-col items-center justify-center relative overflow-hidden px-4">
        <div className="max-w-[1400px] w-full text-center">
          <h2 className="text-[80px] sm:text-[200px] lg:text-[44px] mt-16 leading-none font-bold">
            Happy Buyers,Real stories
          </h2>
          <p className="text-[22px] mt-4 sm:text-[22px]">
            stories from happy buyers who found their car with DriveXDeals.
          </p>

          {/* Search Section */}
          <div className="mt-12 w-full flex flex-col sm:flex-row items-center justify-center gap-4 max-w-[1400px] mx-auto">
            <div className="flex-1 sm:max-w-[914px] h-[57px] bg-white border border-gray-300 rounded-full flex items-center px-4">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 h-full bg-transparent focus:outline-none border-none text-black font-light"
              />
              <div className="flex items-center gap-2 ml-4">
                {/* Price Range */}
                <div className="border border-gray-300 rounded-full px-4 py-2">
                  <select className="bg-transparent focus:outline-none border-none text-gray-700 font-light">
                    <option>Price Range</option>
                    <option>$0 - $100</option>
                    <option>$100 - $500</option>
                    <option>$500+</option>
                  </select>
                </div>

                {/* Cities */}
                <div className="border border-gray-300 rounded-full px-4 py-2">
                  <select className="bg-transparent focus:outline-none border-none text-gray-700 font-light">
                    <option>All Cities</option>
                    <option>Karachi</option>
                    <option>Lahore</option>
                    <option>Islamabad</option>
                  </select>
                </div>
              </div>
            </div>

            <button className="bg-red-700 hover:bg-green-600 h-[57px] text-white px-8 py-4 text-lg rounded-full shadow-lg font-medium transition w-full sm:w-auto">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Blog Grid Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 p-6 rounded-xl shadow">
          {displayedStories.map(({ id, title, description, imgSrc }) => (
            <div
              key={id}
              className="border rounded-3xl h-[500px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col bg-white"
            >
              <div className="w-full border rounded-3xl overflow-hidden">
                <Image
                  src={imgSrc}
                  alt={title}
                  width={400}
                  height={250}
                  className="object-cover w-full"
                />
              </div>

              <div className="px-4 sm:px-6 pb-6 flex-1 flex flex-col mt-6 w-full">
                <div className="flex-grow">
                  <h3 className="font-medium text-2xl sm:text-xl mb-2">{title}</h3>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base">{description}</p>
                </div>

                <div className="mt-auto w-full">
                  <Link href={`/blog/${id}`}>
                    <button className="w-full border border-gray-300 rounded-2xl py-2 text-xl hover:bg-gray-100 transition">
                      Read My Story
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-3 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === 1
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-700 text-gray-700 hover:bg-gray-200"
            }`}
            aria-label="Previous Page"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === pageNum
                    ? "bg-green-700 text-white border-green-700"
                    : "border-gray-700 text-gray-700 hover:bg-gray-200"
                }`}
                aria-current={currentPage === pageNum ? "page" : undefined}
                aria-label={`Page ${pageNum}`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === totalPages
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-700 text-gray-700 hover:bg-gray-200"
            }`}
            aria-label="Next Page"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
}
