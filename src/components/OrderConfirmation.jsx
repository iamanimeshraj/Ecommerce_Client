import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 sm:p-10 max-w-lg text-center">
        <CheckCircle className="text-green-600 w-20 h-20 mx-auto mb-4" />
        
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Order is Confirmed!</h2>
        <p className="text-lg text-gray-700 mb-4">
          Thank you for shopping with us. We're preparing your items for shipment and will notify you once it's on the way.
        </p>
        
        <div className="bg-green-50 text-green-800 text-sm rounded-lg px-4 py-3 mb-6 border border-green-300">
          A confirmation email has been sent to your registered email address. You can track your order anytime from your profile.
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="bg-green-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Continue Shopping
          </Link>
          <Link
            to="/profile/orders"
            className="bg-rose-700 text-white font-medium px-6 py-2 rounded-lg hover:bg-rose-800 transition"
          >
            View My Orders
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Need help? <span className="underline cursor-pointer text-rose-700 hover:text-rose-800">Contact Support</span>
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
