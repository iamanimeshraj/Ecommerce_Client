import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://cdn.shopify.com/s/files/1/1115/6326/files/B1007_Diamond_Pendants_1002_thumb_cdacec1a-3aec-487f-b9be-4c723c3801ca.jpg?v=1602840981",
      alt: "Elegant Gold Set",
    },
    {
      id: 2,
      image:
        "https://blog.zcova.com/wp-content/uploads/2021/11/Average-Diamond-Ring-Size-Blog-Banner1.png",
      alt: "Diamond Perfection",
    },
    {
      id: 3,
      image:"https://cdn.shopify.com/s/files/1/1115/6326/files/B1007_Diamond_Pendants_1003_thumb_5aa410bf-8ee7-4d10-afc0-df5516e9da5c.jpg?v=1602841019",
      alt: "Traditional Beauty",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Move to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Move to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-scroll effect: every 4 seconds move to the next slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-screen h-screen flex-shrink-0 relative"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            {/* Optional overlay text */}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => {
          prevSlide();
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-10"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={() => {
          nextSlide();
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-10"
      >
        <ChevronRight size={28} />
      </button>

      {/* Counter */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full z-10">
        {currentSlide + 1} / {slides.length}
      </div>
    </section>
  );
};

export default HeroSlider;
