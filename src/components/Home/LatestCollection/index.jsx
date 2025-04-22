import { useEffect, useState } from "react";
import Title from "../../Title";
import ProductItem from "../../ProductItem";
import axios from "axios";

export default function LatestCollection() {
    const domain = "http://localhost:1337";
    const [latestProducts, setLatestProducts] = useState([]);

    const getData = () => {
        const url = `${domain}/api/products`;
        axios.get(url, {
            params: {
                populate: "*",
                "filters[collection_type][$eq]": "latest",
                "pagination[limit]": 10,
            },
        }).then((res) => {
            setLatestProducts(res.data.data);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <section className="py-16 bg-white">
            {/* Title Section */}
            <div className="text-center mb-12 px-4">
                <Title text1={"LATEST"} text2={"COLLECTION"} />
                <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    Step into the spotlight with the newest fashion arrivals curated just for you abdk dadljduhdwdl jkohbk jkookjsdw jugdwkoqjdihlp, gdwdqfijq .
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 px-4">
                {latestProducts.map((el) => {
                    return (
                        <div
                            key={el.id}
                            className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-4"
                        >
                            <ProductItem
                                key={el.id} id={el.documentId} image={domain + el.image.url} name={el.name} price={el.price} 
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}