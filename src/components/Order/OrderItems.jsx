export default function OrderItems({ cartItems, products, currency }) {
    const parsedCartItems = [];

    for (const productId in cartItems) {
    const sizes = cartItems[productId];
    for (const size in sizes) {
        const quantity = sizes[size];
        const product = products.find((p) => p.id === Number(productId));

        if (product) {
        parsedCartItems.push({
            id: product.id,
            title: product.title,
            image: product.image.url,
            price: product.price,
            size,
            quantity,
        });
        }
    }
    }

    if (parsedCartItems.length === 0) {
    return <p className="text-gray-500">No cart items.</p>;
    }

    return (
    <>
        {parsedCartItems.map((item, index) => (
        <div key={index} className="flex items-start gap-4 mt-2 text-sm border p-2 rounded bg-gray-50">
            <img
            src={`http://localhost:1337${item.image}`}
            className="w-16 h-16 object-cover rounded"
            alt={item.title}
            />
            <div>
            <p className="font-medium">{item.title}</p>
            <p>Size: {item.size}</p>
            <p>Price: {currency}{item.price}</p>
            <p>Quantity: {item.quantity}</p>
            </div>
        </div>
        ))}
    </>
    );
}