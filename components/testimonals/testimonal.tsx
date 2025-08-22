// components/TestimonialSlider.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

interface Testimonial {
  id: number;
  name: string;
  handle: string;
  content: string;
  avatar: string;
}

const TestimonialSlider = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sue Lang",
      handle: "@Sue Lang",
      content:
        "I recently bought a Tesla through Drive X Deals, and the experience was outstanding from start to finish. I was initially a bit skeptical about purchasing such a high-end vehicle online.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1887&q=80",
    },
    {
      id: 2,
      name: "John Smith",
      handle: "@JohnSmith",
      content:
        "I recently bought a Tesla through Drive X Deals, and the experience was outstanding from start to finish. I was initially a bit skeptical about purchasing such a high-end vehicle online.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1887&q=80",
    },
    {
      id: 3,
      name: "Maria Garcia",
      handle: "@MariaG",
      content:
        "I recently bought a Tesla through Drive X Deals, and the experience was outstanding from start to finish. I was initially a bit skeptical about purchasing such a high-end vehicle online.",
      avatar:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=1899&q=80",
    },
    {
      id: 4,
      name: "Alex Johnson",
      handle: "@AlexJ",
      content:
        "I recently bought a Tesla through Drive X Deals, and the experience was outstanding from start to finish. I was initially a bit skeptical about purchasing such a high-end vehicle online.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1887&q=80",
    },
    {
      id: 5,
      name: "Sarah Williams",
      handle: "@SarahW",
      content:
        "I recently bought a Tesla through Drive X Deals, and the experience was outstanding from start to finish. I was initially a bit skeptical about purchasing such a high-end vehicle online.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=2070&q=80",
    },
  ];

  // do dafa duplicate kiya for seamless loop
  const infiniteTestimonials = [...testimonials, ...testimonials];

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animation: number;
    let pos = 0;

    const step = () => {
      pos -= 1; // speed (px per frame)
      if (Math.abs(pos) >= (testimonials.length * 320)) {
        pos = 0; // reset position jab half loop complete ho
      }
      slider.style.transform = `translateX(${pos}px)`;
      animation = requestAnimationFrame(step);
    };

    animation = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animation);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-4 py-16">
      <div className="w-full max-w-20xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Customer Feedback</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We appreciate your input and would like to take a moment to provide
            you with some detailed feedback specifically to your experience.
          </p>
        </div>

        {/* Continuous Loop Slider */}
        <div className="overflow-hidden relative w-full">
          <div
            ref={sliderRef}
            className="flex space-x-6 transition-none"
            style={{ width: `${infiniteTestimonials.length * 320}px` }}
          >
            {infiniteTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="w-[600px] flex-shrink-0 bg-gray-800 border border-gray-700 rounded-xl p-6 h-[280px] flex flex-col"
              >
                {/* Avatar */}
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-blue-400 text-sm">{testimonial.handle}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 relative">
                  <svg
                    className="w-19 h-10 text-blue-500 opacity-30 absolute -top-2 -left-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-300 leading-relaxed relative z-10">
                    {testimonial.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
