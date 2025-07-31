import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const { url } = useContext(AppContext);

  const fetchCollections = async () => {
    try {
      const res = await axios.get(`${url}/collection/all`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const filtered = res.data.collections
        .filter((col) => col.name !== 'Trending Products')
        .slice(0, 5);
      setCollections(filtered);
    } catch (err) {
      console.error('Failed to fetch collections', err);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  if (collections.length < 5) return null;

  const mainCollection = collections[0];
  const sideCollections = collections.slice(1, 5);

  return (
    <div className="px-4 py-10 mt-10">
      <h2 className="text-3xl font-bold  text-rose-900 mb-8 text-center">Our Collections</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Left Collection */}
        <Link
          to={`/collection/${mainCollection._id}`}
          className="h-[500px] rounded-2xl overflow-hidden shadow-lg relative group"
        >
          <img
            src={mainCollection.image || 'https://via.placeholder.com/800x500'}
            alt={mainCollection.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent flex items-end p-6">
            <h3 className="text-white text-3xl font-bold">{mainCollection.name}</h3>
          </div>
        </Link>

        {/* 4 Smaller Right Collections */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {sideCollections.map((col) => (
            <Link
              key={col._id}
              to={`/collection/${col._id}`}
              className="rounded-2xl overflow-hidden h-[240px] shadow-md relative group"
            >
              <img
                src={col.image || 'https://via.placeholder.com/400x240'}
                alt={col.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/50 to-transparent flex items-end p-4">
                <h4 className="text-white text-xl font-semibold">{col.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
