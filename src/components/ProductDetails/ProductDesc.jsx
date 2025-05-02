import { useState } from "react";

export default function ProductDesc() {
    const [activeTab, setActiveTab] = useState("description");

    return (
        <div className="mt-16">
            {/* Tabs Header */}
            <div className="flex border-b text-sm font-medium">
                <button
                    onClick={() => setActiveTab("description")}
                    className={`px-6 py-3 transition-all duration-200 ${
                        activeTab === "description"
                            ? "border-b-2 border-black text-black"
                            : "text-gray-500"
                    }`}
                >
                    Description
                </button>
                <button
                    onClick={() => setActiveTab("reviews")}
                    className={`px-6 py-3 transition-all duration-200 ${
                        activeTab === "reviews"
                            ? "border-b-2 border-black text-black"
                            : "text-gray-500"
                    }`}
                >
                    Reviews (122)
                </button>
            </div>

            {/* Tabs Content */}
            <div className="bg-gray-50 p-6 text-sm text-gray-600 leading-relaxed border-b">
                {activeTab === "description" && (
                    <>
                        <p className="mb-2">
                            An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet.
                        </p>
                        <p>
                            Each product usually has its own dedicated page with relevant information including images, price, description, and reviews.
                        </p>
                    </>
                )}

                {activeTab === "reviews" && (
                    <div className="space-y-4">
                        <p className="text-gray-700 font-medium">John Doe</p>
                        <p>"Great product quality and fast delivery!"</p>
                        <hr />
                        <p className="text-gray-700 font-medium">Jane Smith</p>
                        <p>"Sizes are accurate and fabric feels premium."</p>
                        <hr />
                        <p className="text-gray-700 font-medium">Ali Mohamed</p>
                        <p>"Excellent customer service and packaging."</p>
                    </div>
                )}
            </div>
        </div>
    );
}
