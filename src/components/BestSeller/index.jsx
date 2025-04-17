import { useState } from "react"
import { useEffect } from "react";
import Title from "../Title";
import ProductItem from "../ProductItem";
import axios from "axios";

export default function BestSeller() {
    const domain = "http://localhost:1337";
    const [bestSeller,setBestSeller] = useState([]);
    
    const getData = () => {
        let endPoint = "/api/products";
        let url = domain + endPoint;
        axios.get(url, {
            params : {
                populate: "*",
                "filters[collection_type][$eq]": "bestseller",
                "pagination[limit]": 5
            }
        }).then((res) => {
            setBestSeller(res.data.data);
        })
    }
    useEffect(() => {
        getData()
    },[])

    return (
        <div className="my-10">
            <div className="text-center mb-12">
                <Title text1={"BEST"} text2={"SELLER"} />
                <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
                    Step into the spotlight with the newest fashion arrivals curated just for you.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    bestSeller.map((el) => (
                            <ProductItem
                                key={el.id}
                                id={el.documentId}
                                image={domain + el.image.url}
                                name={el.name} 
                                price={el.price}
                            />
                    ))
                }
            </div>
        </div>
    )
}
