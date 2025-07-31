import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RelatedProduct from '../components/RelatedProduct';
import AppContext from '../context/AppContext';

const ProductDetails = () => {
  const {addTocart,url}=useContext(AppContext)
  const { id } = useParams();
  const [specificProduct, setSpecificProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    const fetchSpecificProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/${id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        });
        setSpecificProduct(api.data.product);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchSpecificProduct();
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === 'inc') setQuantity(quantity + 1);
    if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    // console.log('Added to cart:', { ...specificProduct, quantity });
    addTocart(specificProduct._id,specificProduct.title,specificProduct.price,quantity,specificProduct.image);
    
  };

  if (!specificProduct) return <div className="p-10 text-center">Loading...</div>;

  return (
    <>
    <div className="max-w-7xl mt-16 mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      {/* Product Image */}
      <div className="flex items-center justify-center">
        <img
          src={specificProduct.image || 'https://via.placeholder.com/400'}
          alt={specificProduct.title}
          className="rounded-xl object-cover w-full h-[500px] max-w-md shadow-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{specificProduct.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{specificProduct.category}</p>
        </div>

        <p className="text-gray-700 text-lg">{specificProduct.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p><span className="font-semibold">Metal:</span> {specificProduct.metal}</p>
          <p><span className="font-semibold">Weight:</span> {specificProduct.weight}</p>
          {specificProduct.stone && (
            <p><span className="font-semibold">Stone:</span> {specificProduct.stone}</p>
          )}
          <p><span className="font-semibold">Collection:</span> {specificProduct.collection}</p>
        </div>

        <p className="text-3xl font-bold text-rose-900">₹{specificProduct.price}</p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleQuantityChange('dec')}
            className="px-3 py-1 bg-gray-200 text-lg rounded-full"
          >-</button>
          <span className="text-xl">{quantity}</span>
          <button
            onClick={() => handleQuantityChange('inc')}
            className="px-3 py-1 bg-gray-200 text-lg rounded-full"
          >+</button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full md:w-1/2 bg-rose-900 hover:bg-amber-700 text-white py-3 rounded-lg text-lg font-medium transition-all"
        >
          Add to Cart
        </button>
      </div>
    </div>
    <div className='my-10 text-center'>
          <RelatedProduct category={specificProduct?.category}/>
    </div>
</>
  );
};

export default ProductDetails;
