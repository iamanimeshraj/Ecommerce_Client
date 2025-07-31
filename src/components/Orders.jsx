import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";
import {
  Truck,
  PackageCheck,
  Clock,
  Ban,
  CheckCircle,
} from "lucide-react";

const Orders = () => {
  const { fetchOrder } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrder();
        setOrders(data?.data?.orders || []);
      } catch (err) {
        console.log("Error fetching orders", err);
      }
    };
    loadOrders();
  }, [fetchOrder]);

  const getStatus = (status) => {
    switch (status) {
      case "Delivered":
        return {
          icon: <PackageCheck className="w-4 h-4 mr-1" />,
          color: "bg-green-100 text-green-700",
        };
      case "Shipped":
        return {
          icon: <Truck className="w-4 h-4 mr-1" />,
          color: "bg-blue-100 text-blue-700",
        };
      case "Cancelled":
        return {
          icon: <Ban className="w-4 h-4 mr-1" />,
          color: "bg-red-100 text-red-700",
        };
      case "Processing":
      default:
        return {
          icon: <Clock className="w-4 h-4 mr-1" />,
          color: "bg-yellow-100 text-yellow-700",
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">You haven’t placed any orders yet.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => {
            const statusInfo = getStatus(order?.orderStatus);

            return (
              <div
                key={order?._id}
                className="bg-white p-4 sm:p-5 border rounded-xl shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  {/* Order Details */}
                  <div className="text-sm sm:text-base text-gray-700">
                    <p className="font-semibold text-gray-800 text-base sm:text-lg">
                      Order ID: {order?.orderId || "N/A"}
                    </p>
                    <p className="mt-1">
                      Items: {order?.orderedItems?.length || 0} | Amount: ₹{order?.amount?.toFixed(2) || "0.00"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Placed on: {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-col sm:items-end gap-2">
                    <div
                      className={`inline-flex items-center px-3 py-1 text-xs sm:text-sm rounded-full font-medium ${statusInfo.color}`}
                    >
                      {statusInfo.icon}
                      {order?.orderStatus || "Processing"}
                    </div>
                    <div className="inline-flex items-center px-3 py-1 text-xs sm:text-sm rounded-full font-medium bg-green-100 text-green-700">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {order?.payStatus || "Paid"}
                    </div>
                  </div>
                </div>

                {/* Check Details Button */}
                <div className="mt-4 flex justify-end">
                  <Link
                    to={`${order._id}`}
                    className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Check Order Summary
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
