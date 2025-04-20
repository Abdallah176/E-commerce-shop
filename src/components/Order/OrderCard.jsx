import OrderStatusBadge from "./OrderStatusBadge";
import OrderItems from "./OrderItems";

export default function OrderCard({ order, products, currency }) {
    const { id, firstName, lastName, statuss, total, createdAt, cartItems } = order;

    return (
        <div className="p-4 border rounded shadow-sm space-y-3 bg-white">
        <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">
            Order #{id} - {firstName} {lastName}
            </p>
        </div>

        <p><strong>Total:</strong> {currency}{total}</p>
        <p><strong>Date:</strong> {new Date(createdAt).toLocaleDateString()}</p>

        <p>
            <strong>Status:</strong> <OrderStatusBadge status={statuss} />
        </p>

        <div id={`invoice-${id}`}>
            <h3 className="font-semibold mt-4 mb-2">Cart Items:</h3>
            <OrderItems cartItems={cartItems} products={products} currency={currency} />
        </div>
        </div>
    );
}
