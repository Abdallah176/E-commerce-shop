import React from 'react'
import heroImg from '../../../assets/hero-sec.png';

export default function HeroImage() {
  return (
    <img
    src={heroImg}
    alt="Hero Background"
    className="absolute inset-0 w-full h-full object-cover opacity-90 animate-image-float"
  />
);
}
