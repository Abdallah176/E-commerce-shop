import { useEffect, useState } from "react"
// import { ShopContext } from "../../context/ShopContext"
import Title from "../Title"
import ProductItem from "../ProductItem";
import axios from "axios";
import useShopStore from "../../store/useShopStore";
// import { data } from "react-router-dom";

export default function LatestCollection() {
    const domain = "http://localhost:1337";
    const {products} = useShopStore();
    // const { products } = useContext(ShopContext);
    const [LatestProducts,setLatestProducts] = useState([]);
    // const [appCtegories,setAppCtegories] = useState([]);
    // console.log(products);

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
            // console.log(res.data.data);
            setLatestProducts(res.data.data);
        })
    }
    useEffect(() => {
        // setLatestProducts(products.slice(0,10));
        getData(products.slice(0,10))
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
                        <ProductItem key={el.id} id={el.id} image={domain + el.image.url} name={el.name} price={el.price} />
                    ))
                }
            </div>
        </div>
    )
}
