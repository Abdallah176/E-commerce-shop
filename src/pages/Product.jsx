import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useShopStore from "../store/useShopStore";
import axios from "axios";
import ProductGallery from "../components/ProductDetails/ProductGallery";
import ProductInfo from "../components/ProductDetails/ProductInfo";
import ProductDescription from "../components/ProductDetails/ProductDesc";
import RelatedProducts from "../components/RelatedProducts";

export default function Product() {
    const domain = "http://localhost:1337";
    const params = useParams();
    const { currency, addToCart } = useShopStore();
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');
    const navigate = useNavigate();

    const getData = () => {
        const documentId = params.id;
        const url = `${domain}/api/products?filters[documentId][$eq]=${documentId}&populate=*`;
        axios.get(url).then((res) => {
            const data = res.data.data[0];
            if (!data) {
                navigate('/error');
                return;
            }
            setProductData(data);
            setImage(domain + data.image.url);
        });
    };
    useEffect(() => {
        getData()
        console.log("Fetching product by ID:", params.id);
        console.log("productssssssss" , productData)
    }, [params.id]);

    if (!productData) {
        return <div className="text-center py-20 text-gray-500">Loading product...</div>;
    }
    return (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
            <ProductGallery images={productData.images?.data} setImage={setImage} image={image} />
            <ProductInfo productData={productData} size={size} setSize={setSize} currency={currency} addToCart={addToCart} />
        </div>

        <ProductDescription />
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
);
}