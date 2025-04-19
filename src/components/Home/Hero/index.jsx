import React from 'react';
import heroImg from '../../../assets/heroo.jpg';

export default function Hero() {
    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-white text-center px-4">
            
            {/* Background Image */}
            <img
                src={heroImg}
                alt="Hero Background"
                className="absolute inset-0 w-full h-full object-cover opacity-50 animate-image-float"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white/70 animate-gradientFade z-10"></div>

            {/* Text Content */}
            <div className="relative z-20 max-w-3xl mx-auto space-y-6">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                    <span className="block animate-typewriter whitespace-nowrap overflow-hidden border-r-4 border-black pr-3 max-w-full">
                        Redefine Your Wardrobe with Confidence
                    </span>
                </h1>
                <p className="text-gray-700 text-lg sm:text-xl animate-text-float">
                    Where Street Style Meets Luxury
                </p>
                <a
                    href="#"
                    className="inline-block mt-4 px-8 py-3 rounded-full bg-black text-white text-sm sm:text-base font-semibold tracking-wide hover:bg-gray-800 transition-all duration-300"
                >
                    Shop Now
                </a>
            </div>
        </section>
        
    );
}
