import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProductGallery from "../components/ProductDetails/ProductGallery";
import RelatedProducts from "../components/Home/RelatedProducts/RelatedProducts";
import ProductDesc from "../components/ProductDetails/ProductDesc";
import useProductStore from "../store/useProductStore";
import useCartStore from "../store/useCartStore";
import ProductInfo from "../components/ProductDetails/ProductInfo/ProductInfo";

export default function Product() {
    const domain = "http://localhost:1337";
    const params = useParams();
    const { addToCart } = useCartStore();
    const { currency } = useProductStore();
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const documentId = params.id;
                const res = await axios.get(`${domain}/api/products?filters[documentId][$eq]=${documentId}&populate=*`);
                const data = res.data.data[0];
                
                if (!data) return navigate('/error');
                setProductData(data);
                console.log("Product Data =>", data);

                const imgData = data.images;
                if (imgData?.length > 0) {
                    setImage(domain + imgData[0].url);
                } else if (data.image?.url) {
                    setImage(domain + data.image.url);
                } else {
                    setImage('/fallback.jpg');
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                navigate('/error');
            }
        };

        fetchProduct();
    }, [params.id]);

    if (!productData) {
        return (
            <div className="text-center py-20 text-gray-500 animate-pulse">
                Loading product details...
            </div>
        );
    }

    return (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                <ProductGallery
                    images={productData.images?.map((img) => img)}
                    fallbackImage={
                        domain + (productData.image?.data?.url || "/fallback.jpg")
                    }
                    setImage={setImage}
                    image={image}
                />
                <ProductInfo
                    productData={productData}
                    size={size}
                    setSize={setSize}
                    currency={currency}
                    addToCart={addToCart}
                />
            </div>
            <ProductDesc />
            <RelatedProducts
                   category={productData.category?.data?.name}
                   subCategory={productData.subCategory}
            />
        </div>
    );
}
