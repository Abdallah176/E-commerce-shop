import React from 'react';
import heroImg from '../../assets/heroo.jpg'
export default function Hero() {
    return (
        <section className="relative bg-gradient-to-br from-[#fff] to-[#f3f3f3] py-16 px-6 sm:px-12 rounded-3xl overflow-hidden">
            {/* Background circle effect */}
            <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-[#e0e0e0] rounded-full opacity-30 z-0"></div>

            <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
                {/* Text content */}
                <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                    <span className="uppercase text-sm tracking-widest text-gray-600">
                        New In Store
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                        Style that speaks <br /> for itself
                    </h1>
                    <p className="text-gray-600 text-base sm:text-lg">
                        Explore the latest trends and timeless pieces handpicked for you.
                    </p>
                    <div className="mt-4 inline-block">
                        <a
                            href="#"
                            className="px-6 py-3 bg-black text-white rounded-full font-semibold text-sm sm:text-base hover:bg-gray-800 transition-all duration-300"
                        >
                            Explore Collection
                        </a>
                    </div>
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src={heroImg}
                        alt="Fashion Model"
                        className="max-w-[300px] sm:max-w-[400px] md:max-w-[500px] object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
                    />
                </div>
            </div>
        </section>
    );
}
