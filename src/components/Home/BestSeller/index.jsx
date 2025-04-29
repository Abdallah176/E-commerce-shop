import { useEffect, useState } from "react";
import Title from "../../Title";
import axios from "axios";
import ProductItem from "../LatestCollection/ProductItem";


export default function BestSeller() {
    const domain = "http://localhost:1337";
    const [bestSeller, setBestSeller] = useState([]);

    const getData = () => {
        axios.get(`${domain}/api/products`, {
            params: {
                populate: "*",
                "filters[collection_type][$eq]": "bestseller",
                "pagination[limit]": 5
            }
        }).then((res) => {
            setBestSeller(res.data.data);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <section className="py-16 bg-gray-50">
            {/* Title Section */}
            <div className="text-center mb-12 px-4">
                <Title text1={"BEST"} text2={"SELLER"} />
                <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    Step into the spotlight with the newest fashion arrivals curated just for you.
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 px-4">
                {bestSeller.map((el) => {
                    return (
                        <div
                            key={el.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-4"
                        >
                            <ProductItem
                                key={el.id}
                                id={el.documentId}
                                image={domain + el.image.url}
                                name={el.name} 
                                price={el.price}
                                />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}






