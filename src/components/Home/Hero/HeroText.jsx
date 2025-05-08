import React from 'react';

export default function HeroText() {
  return (
    <div className="relative z-20 max-w-3xl mx-auto space-y-6 text-white animate-slide-in-top">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
      <span className="block bg-gradient-to-r from-orange-600 via-pink-100 to-gray-900 bg-clip-text text-transparent animate-elliptical-motion">
        Elevate Your Shopping
      </span>

        <span className="block bg-gradient-to-r from-gray-900 via-pink-100 to-orange-600 bg-clip-text text-transparent text-2xl sm:text-3xl mt-2 animate-slide-in-up">
          Trendy. Easy. Affordable.
        </span>
      </h1>

      <p className="text-gray-200 text-lg sm:text-xl max-w-xl mx-auto animate-fade-in delay-200">
        Enjoy a seamless shopping experience with curated picks, unbeatable deals, and styles that fit every personality.
      </p>

      <a
        href="/collection"
        className="relative overflow-hidden mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-orange-700 via-pink-100 to-black text-white text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 transform hover:scale-105 animate-fade-in delay-300 shadow-lg hover:shadow-xl"
      >
        <span className="relative z-10">Shop the Collection</span>
        <span className="absolute top-0 left-[-75%] w-1/2 h-full bg-white opacity-20 rotate-12 pointer-events-none animate-shine-alternate"></span>
      </a>
    </div>
  );
}
