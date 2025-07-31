import React, { useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'


const SearchProduct = () => {
    const {term}=useParams();
    const {product}=useContext(AppContext);
    const [search, setSearch] = useState(null)
    useEffect(() => {
      setSearch(product.filter((data)=>data.title.toLowerCase().includes(term.toLowerCase())))
    }, [term, product])
    
  return (
    <>
<div className="px-4 py-8 mt-16">
  <h2 className="text-3xl font-bold mb-6 text-center">Search Results</h2>

  {/* flex‑box wrapper */}
  <div className="flex flex-wrap justify-center gap-8">
    {search?.map((item) => (
      <Link to={`/product/${item._id}`} key={item._id}>
        <div className="w-72 bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="w-full h-80 overflow-hidden">
            <img
              src={item.image || 'https://via.placeholder.com/300'}
              alt={item.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="p-4">
            <h4 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h4>

            <div className="flex justify-between items-center mt-2">
              <span className="text-red-600 font-bold text-lg">
                ₹{item.price}
              </span>
              <button className="bg-red-700 text-white px-4 py-1 rounded hover:bg-red-800 transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>

    </>
  )
}

export default SearchProduct