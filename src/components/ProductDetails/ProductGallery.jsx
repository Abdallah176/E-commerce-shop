import { useEffect } from "react";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function ProductGallery({ images, setImage, image, fallbackImage }) {
    const domain = "http://localhost:1337";

    useEffect(() => {
        console.log('Images in Gallery:', images);
    }, [images]);

    const handleImageClick = (imgUrl) => {
        setImage(domain + imgUrl);
        console.log("Setting image:", domain + imgUrl);
    };

    return (
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                {images?.length > 0 ? (
                    images.map((el, index) => (
                        <img
                            key={index}
                            src={domain + (el?.formats?.thumbnail?.url || el.url)}
                            onClick={() => handleImageClick(el.url)}
                            className="cursor-pointer w-[24%] sm:w-full sm:mb-3 flex-shrink-0"
                            alt={`Product Thumbnail ${index}`}
                        />
                    ))
                ) : (
                    <img
                        src={fallbackImage}
                        onClick={() => handleImageClick(fallbackImage.replace(domain, ""))} 
                        className="cursor-pointer w-[24%] sm:w-full sm:mb-3 flex-shrink-0"
                        alt="Fallback Thumbnail"
                    />
                )}
            </div>

            <div className="w-full sm:w-[80%]">
                <Zoom>
                    <img
                        className="w-full h-auto"
                        src={image}
                        alt="Product"
                        onError={(e) => { e.target.src = '/fallback.jpg'; }}
                    />
                </Zoom>
            </div>
        </div>
    );
}
