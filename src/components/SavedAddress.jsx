import React, { useEffect, useContext } from "react";
import AppContext from "../context/AppContext";
import { MapPin, Pencil, Trash2 } from "lucide-react";

const Addresses = () => {
  const { fetchAddresses, fetchAddress } = useContext(AppContext);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleComingSoon = () => {
    alert("Functionality Coming soon! Stay Tuned");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Saved Addresses</h1>

      {fetchAddress.length === 0 ? (
        <p className="text-gray-500">You haven't saved any addresses yet.</p>
      ) : (
        <div className="space-y-4">
          {fetchAddress.map((addr) => (
            <div
              key={addr._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <MapPin className="text-blue-600 w-5 h-5 mt-1" />
                <div>
                  <p className="font-semibold text-base">{addr.fullname}</p>
                  <p>{addr.address}, {addr.city}</p>
                  <p>{addr.state} - {addr.pincode}</p>
                  <p>{addr.country}</p>
                  <p className="text-gray-500 mt-1">Phone: {addr.phone}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  onClick={handleComingSoon}
                  className="flex items-center text-sm px-3 py-1 rounded text-blue-600 hover:bg-blue-100"
                >
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </button>
                <button
                  onClick={handleComingSoon}
                  className="flex items-center text-sm px-3 py-1 rounded text-red-600 hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
