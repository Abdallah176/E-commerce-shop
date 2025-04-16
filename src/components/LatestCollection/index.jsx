import { useEffect, useState } from "react"
import Title from "../Title"
import ProductItem from "../ProductItem";
import axios from "axios";

export default function LatestCollection() {
    const domain = "http://localhost:1337";
    const [LatestProducts,setLatestProducts] = useState([]);

    const getData = () => {
        let endPoint = "/api/products";
        let url = domain + endPoint;
        axios.get(url, {
            params : {
                populate: "*",
                "filters[collection_type][$eq]": "latest",
                "pagination[limit]": 10
            }
        }).then((res) => {
            setLatestProducts(res.data.data);
        })
    }
    useEffect(() => {
        getData()
    },[])

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1={'LATEST'} text2={'COLLECTION'}/>
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nostrum quibusdam excepturi hic quis animi minus. 
                </p>
            </div>
            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    LatestProducts.map((el) => (
                        // console.log("Products from Strapi:", appCtegories);
                        <ProductItem key={el.id} id={el.documentId} image={domain + el.image.url} name={el.name} price={el.price} />
                    ))
                }
            </div>
        </div>
    )
}
