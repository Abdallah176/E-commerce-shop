import React from 'react';
import HeroImage from './HeroImage';
import Overlay from './Overlay';
import HeroText from './HeroText';

export default function Hero() {
    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-white text-center px-4">
            <HeroImage />
            <Overlay />
            <HeroText /> 
        </section>
    );
}
