"use client";

import { useState } from "react";
import Image from "next/image";
import blogData from "./blogData";
import ExploreSection from "../explore/page";
import ProductSection from "@/components/productSection/productSection";

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogData.length / blogsPerPage);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mt-16 mb-4">Our Blog</h1>
      <p className="text-lg text-center text-gray-600 mb-12">
        Latest articles and tutorials to help you learn Flutter development
      </p>

      {/* Blog Cards Grid */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-300 flex flex-col"
          >
            <div className="border-b border-gray-300 p-1">
              <Image
                src={blog.image}
                alt={blog.title}
                width={400}
                height={220}
                className="w-full h-52 object-cover rounded-md"
              />
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xl font-semibold mb-3">{blog.title}</h2>
                <p className="text-gray-600 mb-6">{blog.description}</p>
              </div>
              <div className="flex justify-center mt-auto">
                <button className="w-3/4 px-6 py-3 border border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-full border ${
              currentPage === i + 1
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 border-green-600"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Other Sections */}
      <ExploreSection />
      <ProductSection />
    </div>
  );
}
