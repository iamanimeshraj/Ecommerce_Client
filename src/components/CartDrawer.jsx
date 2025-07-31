import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import ShippingAddressDrawer from "./ShippingAddressDrawer";
import OrderSummaryDrawer from "./OrderSummaryDrawer";


const CartDrawer = ({ isOpen, onClose }) => {
  const {
    usercart,
    clearCart,
    deleteProduct,
    increaseqty,
    decreaseqty,
  } = useContext(AppContext);
const [isShippingOpen, setIsShippingOpen] = React.useState(false);
const [selectedAddress, setSelectedAddress] = React.useState(null);
const [isSummaryOpen, setIsSummaryOpen] = React.useState(false);




  const total = usercart?.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white  shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-100">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6 text-gray-600 hover:text-black" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 pt-6 overflow-y-auto h-[calc(100%-200px)]">
        {usercart?.length > 0 ? (
          usercart.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 mb-4 border-b pb-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.title}</h4>
                <p className="text-sm text-gray-500">₹{item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseqty(item.productId, 1)}
                    className="w-6 h-6 bg-gray-200 text-gray-700 rounded-full text-sm flex items-center justify-center hover:bg-gray-300"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm px-1">{item.qty}</span>
                  <button
                    onClick={() => increaseqty(item.productId, 1)}
                    className="w-6 h-6 bg-gray-200 text-gray-700 rounded-full text-sm flex items-center justify-center hover:bg-gray-300"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between h-full">
                <div className="font-semibold text-red-600 text-sm">
                  ₹{item.totalprice }
                </div>
                <button
                  onClick={() => deleteProduct(item.productId)}
                  className="text-gray-400 hover:text-red-500 mt-1"
                  title="Remove Item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-20">
            Your cart is empty
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Total:</span>
          <span className="text-xl font-bold text-red-700">
            ₹{total || 0}
          </span>
        </div>
        <button
          onClick={() =>{              
              setIsShippingOpen(true); 
            }}
          className="w-full bg-rose-900 text-white mt-2 py-2 rounded hover:bg-green-600 transition duration-200 mb-2"
          disabled={usercart?.length === 0}
        >
          Proceed to Checkout
        </button>
        <button
          onClick={()=> {
            if(confirm("Are You Sure, You Want to Remove All The Items from Your Cart?")){
              clearCart();
            }
          }}
          className="w-full bg-gray-200 text-gray-700 py-2 cursor-pointer rounded hover:bg-gray-300 transition duration-200 text-sm"
          disabled={usercart?.length === 0}
        >
          Clear Cart
        </button>
      </div>
      <ShippingAddressDrawer
          isOpen={isShippingOpen}
          onClose={() => setIsShippingOpen(false)}
          token={localStorage.getItem("token")}
          onAddressSelect={(addr) => {
            setSelectedAddress(addr);
            setIsShippingOpen(false);  // close address drawer
            setIsSummaryOpen(true);    // open order summary drawer
          }}
        />

        <OrderSummaryDrawer
          isOpen={isSummaryOpen}
          onClose={() => setIsSummaryOpen(false)}
          cartItems={usercart}
          shippingAddress={selectedAddress}
          closeCart={onClose}
        />

    </div>
  );
};

export default CartDrawer;
