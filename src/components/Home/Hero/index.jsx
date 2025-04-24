import React from 'react';
import heroImg from '../../../assets/hero-sec.png';

export default function Hero() {
    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-white text-center px-4">
            
            {/* Background Image */}
            <img
                src={heroImg}
                alt="Hero Background"
                className="absolute inset-0 w-full h-full object-cover opacity-90 animate-image-float"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10"></div>

            {/* Text Content */}
            <div className="relative z-20 max-w-3xl mx-auto space-y-6 text-white">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                    <span className="block bg-gradient-to-r from-orange-600 via-pink-100 to-gray-900 bg-clip-text text-transparent animate-fade-in">
                        Redefine Your Wardrobe
                    </span>
                    <span className="block bg-gradient-to-r from-gray-900 via-pink-100 to-orange-600 bg-clip-text text-transparent text-2xl sm:text-3xl mt-2 animate-slide-in-up">
                        Confidence. Style. Identity.
                    </span>
                </h1>

                <p className="text-gray-200 text-lg sm:text-xl max-w-xl mx-auto animate-fade-in delay-200">
                    Discover a world where fashion meets individuality. Our curated streetwear drops are designed to turn heads and boost your confidence.
                </p>

                <a
                href="#collection"
                className="relative overflow-hidden mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-orange-700 via-pink-100 to-black text-white text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 transform hover:scale-105 animate-fade-in delay-300 shadow-lg hover:shadow-xl"
                >
                <a href='/lastcollection' className="relative z-10">Shop the Collection</a>
                
                {/* Shine Effect - Alternate */}
                <span className="absolute top-0 left-[-75%] w-1/2 h-full bg-white opacity-20 rotate-12 pointer-events-none animate-shine-alternate"></span>
                </a>

            </div>
        </section>
    );
}
