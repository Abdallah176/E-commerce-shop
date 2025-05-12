import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import OrderCard from "../components/Order/OrderCard";
import { Clock, CheckCircle, XCircle, List } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useAuthStore from "../store/useAuthStore";
import useProductStore from "../store/useProductStore";

export default function Orders() {
  const { currency } = useProductStore();
  const { user, jwt } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [productsIds, setProductsIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:1337/api/orders?populate=*`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      const allOrders = res.data.data;

      const userOrders = allOrders.filter(order => order?.user?.data?.id === user.documenId)
        .map(order => ({
          id: order.id,
          ...order,
        }));

      const allProductIds = userOrders.flatMap(order =>
        Object.keys(order.cartItems || {})
      );
      const uniqueProductIds = [...new Set(allProductIds)];

      setProductsIds(uniqueProductIds);
      setFilteredOrders(userOrders);
      setLoading(false);
      
    } catch (error) {
      console.log("Error fetching orders", error);
      console.log(user)
      setLoading(false);
    }
  };

  const getProducts = async () => {
    if (productsIds.length === 0) return;

    try {
      const query = productsIds.map(id => `filters[id][$in]=${id}`).join("&");
      const res = await axios.get(`http://localhost:1337/api/products?populate=*&${query}`);
      setProducts(res.data.data || []);
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    getProducts();
  }, [productsIds]);

  const statusCounts = {
    pending: filteredOrders.filter((o) => o.statuss?.toLowerCase() === "pending").length,
    completed: filteredOrders.filter((o) => o.statuss?.toLowerCase() === "completed").length,
    cancelled: filteredOrders.filter((o) => o.statuss?.toLowerCase() === "cancelled").length,
    all: filteredOrders.length,
  };

  const displayedOrders =
    selectedStatus === "all"
      ? filteredOrders
      : filteredOrders.filter(
          (order) => order.statuss?.toLowerCase() === selectedStatus
        );

  if (loading) return <div className="p-10">Loading orders...</div>;

  if (displayedOrders.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500">
        {filteredOrders.length === 0
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
          {displayedOrders.map((order) => (
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

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Title from "../components/Title";
// import OrderCard from "../components/Order/OrderCard";
// import { Clock, CheckCircle, XCircle, List } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import useAuthStore from "../store/useAuthStore";
// import useProductStore from "../store/useProductStore";

// export default function Orders() {
//   const { currency } = useProductStore();
//   const { user, jwt } = useAuthStore();
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedStatus, setSelectedStatus] = useState("all");

//   // Get all orders for the current user
//   const getOrders = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:1337/api/orders?populate=*&filters[user][id][$eq]=${user.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         }
//       );

//       setOrders(res.data.data || []);
//     } catch (error) {
//       console.log("Error fetching orders", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get all products
//   const getProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:1337/api/products", {
//         params: {
//           populate: "*",
//         },
//       });
//       setProducts(res.data.data || []);
//     } catch (error) {
//       console.log("Error fetching products", error);
//     }
//   };

//   useEffect(() => {
//     getOrders();
//     getProducts();
//   }, []);

//   const statusCounts = {
//     pending: orders.filter((o) => o.attributes.statuss?.toLowerCase() === "pending").length,
//     completed: orders.filter((o) => o.attributes.statuss?.toLowerCase() === "completed").length,
//     cancelled: orders.filter((o) => o.attributes.statuss?.toLowerCase() === "cancelled").length,
//     all: orders.length,
//   };

//   const filteredOrders =
//     selectedStatus === "all"
//       ? orders
//       : orders.filter(
//           (order) => order.attributes.statuss?.toLowerCase() === selectedStatus
//         );

//   if (loading) return <div className="p-10">Loading orders...</div>;

//   if (filteredOrders.length === 0) {
//     return (
//       <div className="py-10 text-center text-gray-500">
//         {orders.length === 0
//           ? "No orders found."
//           : "No orders with selected status."}
//       </div>
//     );
//   }

//   return (
//     <div className="border-t pt-16">
//       <div className="text-2xl mb-6">
//         <Title text1="MY" text2="ORDERS" />
//       </div>

//       {/* Filter Buttons */}
//       <div className="mb-6 flex flex-wrap gap-2">
//         {[
//           {
//             key: "all",
//             label: "All",
//             count: statusCounts.all,
//             icon: List,
//             iconColor: "text-gray-500",
//           },
//           {
//             key: "pending",
//             label: "Pending",
//             count: statusCounts.pending,
//             icon: Clock,
//             iconColor: "text-yellow-500",
//           },
//           {
//             key: "completed",
//             label: "Completed",
//             count: statusCounts.completed,
//             icon: CheckCircle,
//             iconColor: "text-green-500",
//           },
//           {
//             key: "cancelled",
//             label: "Cancelled",
//             count: statusCounts.cancelled,
//             icon: XCircle,
//             iconColor: "text-red-500",
//           },
//         ].map(({ key, label, count, icon: Icon, iconColor }) => {
//           const isActive = selectedStatus === key;
//           return (
//             <motion.button
//               key={key}
//               onClick={() => setSelectedStatus(key)}
//               whileTap={{ scale: 1.4 }}
//               whileHover={{ scale: 1.03 }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition ${
//                 isActive
//                   ? "bg-black text-white border-black"
//                   : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//               }`}
//             >
//               <Icon size={16} className={iconColor} />
//               {label} ({count})
//             </motion.button>
//           );
//         })}
//       </div>

//       {/* Orders List */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={selectedStatus}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.3 }}
//           className="space-y-10"
//         >
//           {filteredOrders.map((order) => (
//             <OrderCard
//               key={order.id}
//               order={order}
//               products={products}
//               currency={currency}
//             />
//           ))}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// }
