import { useState } from "react"
// import { ShopContext } from "../../context/ShopContext"
import { useEffect } from "react";
import Title from "../Title";
import ProductItem from "../ProductItem";
import axios from "axios";

export default function BestSeller() {
    const domain = "http://localhost:1337";
    // const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);
    // console.log(products)

    
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
            // console.log(res.data.data);
            setBestSeller(res.data.data);
        })
    }

    useEffect(() => {
        // const bestProduct = products.filter((el) => (el.bestseller));
        // setBestSeller(bestProduct.slice(0,5))
        getData()
    },[])

    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil harum ipsam deserunt natus voluptas enim temporibus voluptatum.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    bestSeller.map((el) => (
                        <ProductItem key={el.id} id={el.id} image={domain + el.image.url} name={el.name} price={el.price} />
                    ))
                }
            </div>
        </div>
    )
}
