export default function OrderStatusBadge({ status }) {
    const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case "pending":
        return "bg-yellow-100 text-yellow-700";
        case "completed":
        return "bg-green-100 text-green-700";
        case "cancelled":
        return "bg-red-100 text-red-700";
        default:
        return "bg-gray-100 text-gray-700";
    }
    };

    return (
    <span className={`inline-block px-2 py-1 rounded text-sm ${getStatusColor(status)}`}>
        {status}
    </span>
    );
}