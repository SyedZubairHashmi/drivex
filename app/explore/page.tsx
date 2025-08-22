"use client";

import { useState } from "react";

const videos = [
  {
    id: 1,
    thumbnail: "https://picsum.photos/id/1015/500/300",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "EV Expert Review",
  },
  {
    id: 2,
    thumbnail: "https://picsum.photos/id/1016/500/300",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    title: "X10 EV 1st Look",
  },
  {
    id: 3,
    thumbnail: "https://picsum.photos/id/1018/500/300",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "EV Model 3 Review",
  },
  {
    id: 4,
    thumbnail: "https://picsum.photos/id/1020/500/300",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    title: "EV Model 4 Review",
  },
];

export default function Page() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 2; // front pe 2 videos

  const prev = () => {
    setStartIndex((prev) =>
      prev === 0 ? Math.max(videos.length - visibleCount, 0) : prev - 1
    );
  };

  const next = () => {
    setStartIndex((prev) =>
      prev + visibleCount >= videos.length ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-black text-white py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto pb-6 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-normal">Explore Every Feature in Detail</h2>
        <p className="text-gray-400 text-sm sm:text-base mt-1">
          Full tour of design, comfort & performance.
        </p>
      </div>

      {/* Video Cards */}
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
        {videos.slice(startIndex, startIndex + visibleCount).map((video) => (
          <div
            key={video.id}
            className="w-full sm:w-[48%] md:w-[48%] lg:w-[45%] relative rounded-lg overflow-hidden shadow-lg bg-[#111] cursor-pointer"
          >
            <video
              src={video.videoUrl}
              controls
              className="w-full h-64 sm:h-72 md:h-80 lg:h-80 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div className="max-w-[1200px] mx-auto mt-6 flex justify-center gap-10 items-center select-none">
        <button
          onClick={prev}
          className="text-white text-3xl sm:text-4xl bg-transparent border-none focus:outline-none"
        >
          &#8249;
        </button>
        <button
          onClick={next}
          className="text-white text-3xl sm:text-4xl bg-transparent border-none focus:outline-none"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}
