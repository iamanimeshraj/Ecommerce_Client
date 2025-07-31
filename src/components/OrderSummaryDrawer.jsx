import React, { useContext } from "react";
import { X } from "lucide-react";
import axios from 'axios'
import AppContext from "../context/AppContext";
import {useNavigate} from 'react-router-dom'

const OrderSummaryDrawer = ({ isOpen, onClose, cartItems = [], shippingAddress, closeCart }) => {
  const {user,url, clearCart,createOrder}=useContext(AppContext)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingFee = 40; // set your logic here
  const total = subtotal + shippingFee;
  const naviagte= useNavigate();
  const handlepayment= async ()=>{
    
    try {
      const orderResponse= await axios.post(`${url}/payment/checkout`,{
        amount:total,
        cartItem:cartItems,
        userShipping:shippingAddress,
        userId:user._id
      })
      const {orderId, amount:orderAmount}=orderResponse.data
      const options={
        key: 'rzp_test_uPX9ahYbsxm0P7', // Replace with your Razorpay key_id
        amount: orderAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Vernika Jewels',
        description: 'Test Transaction',
        order_id: orderId, // This is the order_id created in the backend
        // callback_url: 'http://localhost:3000/payment-success', // Your success URL
        handler:async function(response){
          const paymentData= {
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            signature:response.razorpay_signature,
            amount:orderAmount,
            orderedItems:cartItems,
            userId:user._id,
            userShipping:shippingAddress
          }
          const api = await axios.post(`${url}/payment/verify-payment`,paymentData)
          if (api.data.success){
              clearCart();
              onClose();
              closeCart();               
              createOrder(paymentData)
              naviagte('/order-confirmation')

          }
          
          
        },
        prefill: {
          name: 'Animesh Raj',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };
      const rzp= new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-100">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <X className="cursor-pointer" onClick={onClose} />
      </div>

      {/* Body */}
      <div className="p-4 overflow-y-auto h-[calc(100%-220px)] space-y-4">
        {/* Shipping Address */}
        <h3>Shipping To:</h3>
        {shippingAddress && (
          <div className="border rounded p-3 bg-gray-50 text-sm">
            <p className="font-semibold">{shippingAddress.fullname}</p>
            <p>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</p>
            <p>{shippingAddress.country}</p>
            <p>Phone: {shippingAddress.phone}</p>
          </div>
        )}

        {/* Cart Items */}
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center border-b pb-2 text-sm">
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-gray-500">Qty: {item.qty}</p>
              </div>
              <p className="font-semibold">₹{item.price * item.qty}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-100 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>₹{shippingFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <button
          className="w-full bg-green-600 text-white py-2 rounded mt-2 hover:bg-green-700"
          onClick={() => handlepayment()}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderSummaryDrawer;
