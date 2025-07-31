import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import {
  CheckCircle,
  Clock,
  PackageCheck,
  Truck,
  Ban,
  MapPin,
} from "lucide-react";

const OrderDetails = () => {
  const { id } = useParams();
  const { fetchOrderDetails } = useContext(AppContext); // ✅ from context
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      const data = await fetchOrderDetails(id); // ✅ use context function
      setOrder(data);
    };
    loadOrder();
  }, [id, fetchOrderDetails]);

  const getStatusBadge = (status) => {
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
      default:
        return {
          icon: <Clock className="w-4 h-4 mr-1" />,
          color: "bg-yellow-100 text-yellow-700",
        };
    }
  };

  if (!order) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading order details...
      </div>
    );
  }

  const status = getStatusBadge(order.orderStatus);

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="bg-white shadow rounded-xl p-5 space-y-5">
        {/* Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-medium">{order.orderId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Order Date</p>
            <p className="font-medium">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payment Status</p>
            <div className="inline-flex items-center px-3 py-1 text-xs rounded-full font-medium bg-green-100 text-green-700">
              <CheckCircle className="w-4 h-4 mr-1" />
              {order.payStatus}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Order Status</p>
            <div
              className={`inline-flex items-center px-3 py-1 text-xs rounded-full font-medium ${status.color}`}
            >
              {status.icon}
              {order.orderStatus}
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="text-lg font-semibold mt-2 mb-1 flex items-center gap-1">
            <MapPin className="w-5 h-5 text-gray-500" />
            Shipping Address
          </h3>
          <p className="text-sm text-gray-700 leading-6">
            {order.userShipping.fullname}
            <br />
            {order.userShipping.address}, {order.userShipping.city},{" "}
            {order.userShipping.state} - {order.userShipping.pincode}
            <br />
            {order.userShipping.country}
          </p>
        </div>

        {/* Ordered Items */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Items in this Order</h3>
          <div className="space-y-4">
            {order.orderedItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border p-3 rounded-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "/placeholder.webp"}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>
                </div>
                <div className="text-right text-gray-700 font-semibold">
                  ₹{(item.price * item.qty).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-end mt-6">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Paid</p>
            <p className="text-xl font-bold text-green-700">
              ₹{order.amount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
