import ProductItem from "../ProductItem";

export default function ProductList({ products }) {
    
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {products.map((item) => (   
            <ProductItem key={item.id} name={item.name} id={item.documentId} price={item.price} image={item.image} />
        ))}
        </div>
    );
}
