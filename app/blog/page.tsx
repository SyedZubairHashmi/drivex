"use client";

import { useState } from "react";
import blogData from "./blogData";
import ExploreSection from "../explore/page";
import ProductSection from "@/components/productSection/productSection";
import BlogSection from "./blogsSection";

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogData.length / blogsPerPage);

  return (
    <div className="w-full min-h-screen mt-8 ">
    <BlogSection limit={12}/>
      <ExploreSection />
      <ProductSection />
    </div>
  );
}
