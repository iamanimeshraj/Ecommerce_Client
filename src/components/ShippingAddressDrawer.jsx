import React, { useState, useEffect, useContext } from "react";
import { X } from "lucide-react";
import axios from "axios";
import Select from "react-select";
import AppContext from "../context/AppContext";

const ShippingAddressDrawer = ({ isOpen, onClose, token, onAddressSelect }) => {
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    fullname: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phone: ""
  });

  const { fetchAddresses, fetchAddress,url } = useContext(AppContext);
  

  useEffect(() => {
    if (isOpen) fetchAddresses();
  }, [isOpen]);

  const handleSelect = (id) => {
    setSelectedAddressId(id);
    const addr = fetchAddress.find((a) => a._id === id);
    onAddressSelect && onAddressSelect(addr);
  };

  const handleInput = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddNewAddress = async () => {
    const isIncomplete = Object.values(newAddress).some((val) => val.trim() === "");
    if (isIncomplete) {
      alert("Please fill in all address fields.");
      return;
    }

    try {
      const res = await axios.post(`${url}/address/addaddress`, newAddress, {
        headers: { "Content-Type": "application/json", Auth: token }
      });

      if (res.data.success) {
        await fetchAddresses();
        setNewAddress({
          fullname: "",
          address: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
          phone: ""
        });
        alert("Address saved successfully.");
      }
    } catch (err) {
      console.error("Failed to add address", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-lg z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Shipping Address</h2>
        <X className="cursor-pointer" onClick={onClose} />
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
        <h3 className="text-md font-semibold mb-2">Saved Addresses</h3>
        <div className="mb-6">
          {fetchAddress.length === 0 ? (
            <p className="text-sm text-gray-500">No saved addresses yet.</p>
          ) : (
            <Select
              options={fetchAddress.map(addr => ({
                value: addr._id,
                label: `${addr.fullname} - ${addr.address}, ${addr.city}, ${addr.state}`
              }))}
              value={
                fetchAddress.find((a) => a._id === selectedAddressId)
                  ? {
                      value: selectedAddressId,
                      label: fetchAddress.find((a) => a._id === selectedAddressId).fullname,
                    }
                  : null
              }
              onChange={(selectedOption) => handleSelect(selectedOption.value)}
              placeholder="Select from saved addresses"
              className="text-sm"
              isClearable
            />
          )}
        </div>

        <hr className="my-4" />

        <h3 className="text-md font-semibold mb-2">Add New Address</h3>
        <div className="space-y-2">
          {["fullname", "address", "city", "state", "country", "pincode", "phone"].map((field) => (
            <input
              key={field}
              type={field === "pincode" || field === "phone" ? "number" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={newAddress[field]}
              onChange={handleInput}
              className="w-full border px-3 py-2 rounded text-sm"
            />
          ))}
          <button
            onClick={handleAddNewAddress}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressDrawer;
