"use client";

import { useState } from "react";
import carimage1 from "@/public/logo.png";
import Image from "next/image";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCarsOpen, setMobileCarsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [carsOpen, setCarsOpen] = useState(false); // desktop cars dropdown
  const [productsOpen, setProductsOpen] = useState(false); // desktop products dropdown

  return (
    <nav
      className={`absolute top-0 left-0 w-full z-20 py-3 flex items-center justify-between px-4 md:px-12 
        ${isHome ? "bg-transparent" : "bg-black/70 shadow"} transition-colors`}
    >
      {/* Logo */}
      <div className="flex items-center space-x-2 cursor-pointer">
        <Image
          src={carimage1}
          alt="Logo"
          width={184}
          height={24}
          className="object-contain"
        />
      </div>

      {/* Desktop Menu */}
      <ul className={`hidden md:flex space-x-6 font-medium relative text-[16px]`}>
        {/* Cars Dropdown */}
        <li className="relative cursor-pointer">
          <div
            className={`flex items-center gap-1 hover:text-green-400 ${isHome ? "text-white" : "text-black"}`}
            onClick={() => setCarsOpen(!carsOpen)}
          >
            Cars <FaChevronDown size={12} className={`transition-transform ${carsOpen ? "rotate-180" : ""}`} />
          </div>
          {carsOpen && (
            <ul className="absolute left-0 mt-2 bg-white text-black rounded shadow-md w-48 text-[16px]">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                <Link href="/cars-collection">Cars Collection</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                <Link href="/cars-accessories">Cars Accessories</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Products Dropdown */}
        <li className="relative cursor-pointer">
          <div
            className={`flex items-center gap-1 hover:text-green-400 ${isHome ? "text-white" : "text-black"}`}
            onClick={() => setProductsOpen(!productsOpen)}
          >
            Products <FaChevronDown size={12} className={`transition-transform ${productsOpen ? "rotate-180" : ""}`} />
          </div>
          {productsOpen && (
            <ul className="absolute left-0 mt-2 bg-white text-black rounded shadow-md w-48 text-[16px]">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                <Link href="/tyres">Tyres</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                <Link href="/batteries">Batteries</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                <Link href="/accessories">Accessories</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="hover:text-green-400 cursor-pointer text-white">
          <Link href="/blog">Blog</Link>
        </li>
        <li className="hover:text-green-400 cursor-pointer text-white">
          <Link href="/about">About</Link>
        </li>
        <li className="hover:text-green-400 cursor-pointer text-white">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      {/* Desktop Button */}
      <button
        className={`hidden md:block w-[193px] h-[50px] border border-gray-400 rounded-full bg-transparent 
          hover:bg-gray-400 hover:text-black transition
          ${isHome ? "text-white" : "text-black"} text-[16px]`}
      >
        Get My Dream Car
      </button>

      {/* Mobile Menu Button */}
      <div className="md:hidden z-30 flex items-center">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`${isHome ? "text-white" : "text-black"}`}
        >
          {mobileMenuOpen 
            ? <FaTimes size={24} className={isHome ? "text-white" : "text-black"} /> 
            : <FaBars size={24} className={isHome ? "text-white" : "text-black"} />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-white flex flex-col items-start justify-start pt-24 px-6 transition-transform duration-300
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} z-20`}
      >
        <ul className="space-y-4 text-[16px] font-medium text-black w-full">
          {/* Cars Mobile */}
          <li>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setMobileCarsOpen(!mobileCarsOpen)}
            >
              Cars <FaChevronDown className={`transition-transform ${mobileCarsOpen ? "rotate-180" : ""}`} />
            </div>
            {mobileCarsOpen && (
              <ul className="pl-4 mt-2 space-y-2">
                <li>
                  <Link href="/cars-collection" onClick={() => setMobileMenuOpen(false)}>Cars Collection</Link>
                </li>
                <li>
                  <Link href="/cars-accessories" onClick={() => setMobileMenuOpen(false)}>Cars Accessories</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Products Mobile */}
          <li>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
            >
              Products <FaChevronDown className={`transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
            </div>
            {mobileProductsOpen && (
              <ul className="pl-4 mt-2 space-y-2">
                <li>
                  <Link href="/tyres" onClick={() => setMobileMenuOpen(false)}>Tyres</Link>
                </li>
                <li>
                  <Link href="/batteries" onClick={() => setMobileMenuOpen(false)}>Batteries</Link>
                </li>
                <li>
                  <Link href="/accessories" onClick={() => setMobileMenuOpen(false)}>Accessories</Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </li>
          <li>
            <button className="border border-gray-400 text-black rounded-full bg-transparent hover:bg-gray-400 w-full py-2 text-[16px]">
              Get My Dream Car
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
