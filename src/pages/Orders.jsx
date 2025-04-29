import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import OrderCard from "../components/Order/OrderCard";
import useShopStore from "../store/useShopStore";
import { Clock, CheckCircle, XCircle, List } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Orders() {
  const { currency, user } = useShopStore();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          axios.get("http://localhost:1337/api/orders?populate=user"),
          axios.get("http://localhost:1337/api/products?populate=*"),
        ]);
        
        let allOrders = ordersRes.data?.data || [];
        const userOrders = allOrders.filter(
          (order) => order.attributes?.user?.data?.id === user?.id
        );

        setOrders(userOrders);
        setProducts(productsRes.data?.data || []);
      } catch (err) {
        console.error("Error fetching orders or products", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [user]);
  
  const statusCounts = {
    pending: orders.filter((o) => o.statuss?.toLowerCase() === "pending")
      .length,
    completed: orders.filter((o) => o.statuss?.toLowerCase() === "completed")
      .length,
    cancelled: orders.filter((o) => o.statuss?.toLowerCase() === "cancelled")
      .length,
    all: orders.length,
  };

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter(
          (order) => order.statuss?.toLowerCase() === selectedStatus
        );

  if (loading) return <div className="p-10">Loading orders...</div>;
  if (filteredOrders.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500">
        {orders.length === 0
          ? "No orders found."
          : "No orders with selected status."}
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {[
          {
            key: "all",
            label: "All",
            count: statusCounts.all,
            icon: List,
            iconColor: "text-gray-500",
          },
          {
            key: "pending",
            label: "Pending",
            count: statusCounts.pending,
            icon: Clock,
            iconColor: "text-yellow-500",
          },
          {
            key: "completed",
            label: "Completed",
            count: statusCounts.completed,
            icon: CheckCircle,
            iconColor: "text-green-500",
          },
          {
            key: "cancelled",
            label: "Cancelled",
            count: statusCounts.cancelled,
            icon: XCircle,
            iconColor: "text-red-500",
          },
        ].map(({ key, label, count, icon: Icon, iconColor }) => {
          const isActive = selectedStatus === key;
          return (
            <motion.button
              key={key}
              onClick={() => setSelectedStatus(key)}
              whileTap={{ scale: 1.4 }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              <Icon size={16} className={iconColor} />
              {label} ({count})
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedStatus}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-10"
        >
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              products={products}
              currency={currency}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
