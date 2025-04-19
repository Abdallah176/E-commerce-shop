import { useEffect, useState } from "react";
import Title from "../../Title";
import ProductItem from "../../ProductItem";
import axios from "axios";

export default function LatestCollection() {
    const domain = "http://localhost:1337";
    const [latestProducts, setLatestProducts] = useState([]);

    const getData = () => {
        const url = `${domain}/api/products`;
        axios
        .get(url, {
            params: {
            populate: "*",
            "filters[collection_type][$eq]": "latest",
            "pagination[limit]": 10,
            },
        })
        .then((res) => {
            setLatestProducts(res.data.data);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <section className="my-20 px-6 sm:px-12">
            <div className="text-center mb-12">
                <Title text1={"LATEST"} text2={"COLLECTION"} />
                <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
                Step into the spotlight with the newest fashion arrivals curated just for you.
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
                {latestProducts.map((el) => (
                    <ProductItem key={el.id} id={el.documentId} image={domain + el.image.url} name={el.name} price={el.price} />
                ))}
            </div>
        </section>
    );
    }

