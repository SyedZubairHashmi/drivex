'use client';

import React from "react";
import YouTube from "react-youtube";

const videoIds = [
  "dQw4w9WgXcQ", // Example video IDs – replace with your own
  "3JZ_D3ELwOQ",
  "kXYiU_JCYtU",
  "60ItHLz5WEA",
  "hLQl3WQQoQ0",
  "2Vv-BfVoq4g",
  "RgKAFK5djSk",
  "JGwWNGJdvx8"
];

const Gallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-white mt-12 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-4">Drive X Deal Gallery</h1>
        <p className="text-center text-gray-600 mb-12">
          Explore our latest cars and memorable moments in one place.
        </p>
         <div className="mt-6 w-full flex flex-col sm:flex-row items-center  justify-center sm:gap-2">
          {/* White Rounded Box */}
          <div className="flex flex-col sm:flex-row items-end gap-2 rounded-lg  max-w-[1400px] w-full mx-auto">
            {/* Input wrapper div with full rounded border */}
            <div className="flex-1 sm:w-[914px] h-[57px] bg-white border border-gray-300 rounded-full flex items-center px-6">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 sm:w[914px] h-[57] bg-transparent focus:outline-none border-none text-black font-light"
              />
              <div className="flex items-center gap-1 ml-0 sm:ml-4">
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
          </div>
          {/* Search Button */}
          <button className="bg-red-700 hover:bg-green-600 sm:w[124px] h-[57] text-white px-8 py-4 text-lg rounded-full shadow-lg font-medium transition w-full sm:w-auto">
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {videoIds.map((id, idx) => (
            <div key={idx} className="video-card rounded-lg overflow-hidden shadow-md">
              <div className="relative pb-[56.25%] h-0">
                <YouTube
                  videoId={id}
                  className="absolute top-0 left-0 w-full h-full"
                  opts={{
                    playerVars: {
                      autoplay: 0,
                      modestbranding: 1,
                      rel: 0
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
