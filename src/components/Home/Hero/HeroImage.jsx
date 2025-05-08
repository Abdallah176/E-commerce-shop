import React from 'react';
import LeftHero from '../../../assets/left-hero-sec.png';
import rightHero from '../../../assets/right-hero-sec.png'

export default function HeroImage() {
  return (
    <div className="absolute inset-0 flex">

      <div className="w-1/2 h-full animate-slide-in-left">
        <img
          src={LeftHero}
          alt="Left Hero"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      <div className="w-1/2 h-full animate-slide-in-right">
        <img
          src={rightHero}
          alt="Right Hero"
          className="w-full h-full object-cover opacity-90"
        />
      </div>
    </div>
  );
}
