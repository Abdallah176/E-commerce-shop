import { useEffect, useRef } from "react";

export default function MarqueeText() {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee) return;

        let scrollAmount = 1.5;
        let animation;

        const animate = () => {
            marquee.scrollLeft += scrollAmount;
            if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
                marquee.scrollLeft = 0;
            }
            animation = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animation);
    }, []);

    const text = "Shop All You Want — ";

    return (
        <div className="w-full overflow-hidden bg-black text-white py-1 border-b border-white">
            <div
                ref={marqueeRef}
                className="overflow-hidden whitespace-nowrap relative"
            >
                <div className="flex w-max">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex gap-5">
                            {[...Array(50)].map((_, j) => (
                                <span key={j} className=" text-sm font-semibold tracking-wide">
                                    {text}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
