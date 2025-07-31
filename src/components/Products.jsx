import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';

const Products = () => {
  const { addTocart, collections } = useContext(AppContext); 
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [collectionName, setcollectionName] = useState("");
  const [description, setdescription] = useState("");

  useEffect(() => {
    const filter = collections.find((data) => data.name === "Trending Products");
    if (filter && filter.productIds) {
      setTrendingProducts(filter.productIds);
      setcollectionName(filter.name);
      setdescription(filter.description);

    }
  }, [collections]);

  return (
    <div className="px-4 py-8">
      <h2 className="text-3xl text-rose-900 font-bold mb-2 text-center">{collectionName}</h2>
      <h2 className="text-xl font-bold mb-6 text-center">{description}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {trendingProducts?.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <Link to={`/product/${item._id}`}>
              <div className="w-full h-80 overflow-hidden">
                <img
                  src={item.image || 'https://via.placeholder.com/300'}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/product/${item._id}`}>
                <h4 className="text-lg font-semibold text-gray-800 ">{item.title}</h4>
              </Link>
              <div className="flex justify-between items-center mt-2">
                <span className="text-rose-900 font-bold text-lg">₹{item.price}</span>
                <button
                  onClick={() => addTocart(item._id, item.title, item.price, 1, item.image)} 
                  className="bg-rose-900 cursor-pointer text-white px-4 py-1 rounded hover:bg-red-800 transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
