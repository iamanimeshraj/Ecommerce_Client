import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';

const RelatedProduct = ({ category }) => {
  const { product, addTocart } = useContext(AppContext);
  const [related, setRelated] = useState(null);

  useEffect(() => {
    setRelated(
      product.filter(
        (data) => data.category.toLowerCase() === category.toLowerCase()
      )
    );
  }, [category, product]);

  return (
    <div className="px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Related Products</h2>

      <div className="flex flex-wrap justify-center gap-8">
        {related?.map((item) => (
          <div
            key={item._id}
            className="w-72 bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
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
                <h4 className="text-lg font-semibold text-gray-800 truncate">
                  {item.title}
                </h4>
              </Link>

              <div className="flex justify-between items-center mt-2">
                <span className="text-red-600 font-bold text-lg">₹{item.price}</span>
                <button
                  onClick={() =>
                    addTocart(item._id, item.title, item.price, 1, item.image)
                  }
                  className="bg-red-700 text-white px-4 py-1 rounded hover:bg-red-800 transition-colors duration-300"
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

export default RelatedProduct;
