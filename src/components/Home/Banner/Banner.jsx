import React from 'react';
import BannerText from './BannerText';
import BannerImage from './BannerImage';

export default function Banner() {
  return (
    <section className="relative mt-20 px-6 sm:px-16 py-12 bg-white rounded-3xl overflow-hidden shadow-xl">
      <div className="grid md:grid-cols-2 items-center gap-10">
        <BannerText />
        <BannerImage />
      </div>

      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-orange-100 rounded-full blur-3xl z-0 opacity-30" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-indigo-100 rounded-full blur-3xl z-0 opacity-30" />
    </section>
  );
}
