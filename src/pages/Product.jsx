import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import useShopStore from "../store/useShopStore";
import axios from "axios";

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
        console.log("PRODUCT ID:", documentId);
        const endPoint = `/api/products/${documentId}`;
        const url = domain + endPoint;
        axios.get(url, {
            params: {
                populate: "*"
            }
        }).then((res) => {
            const data = res.data.data;
            console.log("Full API Response:", res.data);
            if (!data) {
                navigate('/error');
                return;
            }
            setProductData(data);
            console.log('gggggggggggggggggg',data)
            console.log(data.documentId)
            setImage(domain + data.image.url);
        })
    }
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
                {/* Product Image */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {/* {productData.image.map((item, index) => (
                            <img
                                key={index}
                                src={domain + productData.image.data.attributes.url}
                                onClick={() => setImage(domain + productData.image.data.attributes.url)}
                                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                                alt=""
                            />
                        ))} */}

                        {
                        productData.images?.data.map((imgObj, idx) => (
                            <img
                                key={idx}
                                src={`${domain}${imgObj.attributes.url}`}
                                onClick={() => setImage(`${domain}${imgObj.attributes.url}`)}
                                className="..."
                                alt={`Thumbnail ${idx}`}
                            />
                            ))
                        }
                    </div>
                    <div className="w-full sm:w-[80%]">
                    <img className="w-full h-auto"  src={image} alt={productData.name || "product imageeeee"} onError={(e) => { e.target.src = '/fallback.jpg'; }}/>
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex-1">
                    <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        {[...Array(4)].map((_, i) => (
                            <img src={assets.star_icon} key={i} alt="" className="w-3.5" />
                        ))}
                        <img src={assets.star_dull_icon} alt="" className="w-3.5" />
                        <p className="pl-2">(122)</p>
                    </div>
                    <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
                    <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

                    <div className="flex flex-col gap-4 my-8">
                        <p>Select Size</p>
                        <div className="flex gap-2">
                        {
                            productData.sizes && Array.isArray(productData.sizes) && productData.sizes.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSize(item.value)}
                                    className={`border py-2 px-4 bg-gray-100 ${item.value === size ? 'border-orange-500' : ''}`}
                                >
                                    {item.value}
                                </button>
                            ))
                        }
                        </div>
                    </div>

                    <button
                        onClick={() => addToCart(productData.id , size, productData.name)}
                        className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer"
                    >
                        ADD TO CART
                    </button>

                    <hr className="mt-8 sm:w-4-5" />
                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* Description & Review */}
            <div className="mt-20">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm">Description</b>
                    <p className="border px-5 py-3 text-sm">Reviews (122)</p>
                </div>
                <div className="flex flex-col gap-4 border px-6 py-3 text-sm text-gray-500">
                    <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet.</p>
                    <p>Each product usually has its own dedicated page with relevant information.</p>
                </div>
            </div>



            {/* Related Products */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    );





}