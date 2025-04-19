export default function ProductGallery({ images, setImage, image }) {
    const domain = "http://localhost:1337";

    return (
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                {images?.map((imgObj, idx) => (
                    <img
                        key={idx}
                        src={`${domain}${imgObj.attributes.url}`}
                        onClick={() => setImage(`${domain}${imgObj.attributes.url}`)}
                        className="cursor-pointer w-[24%] sm:w-full sm:mb-3 flex-shrink-0"
                        alt={`Thumbnail ${idx}`}
                    />
                ))}
            </div>
            <div className="w-full sm:w-[80%]">
                <img className="w-full h-auto" src={image} alt="Product" onError={(e) => { e.target.src = '/fallback.jpg'; }} />
            </div>
        </div>
    );
}
