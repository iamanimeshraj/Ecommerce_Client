import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Vernika Jewels</h2>
          <p className="text-gray-400 text-sm">
            Redefining timeless elegance with traditional craftsmanship. Explore our stunning collection crafted to perfection.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/">Home</a></li>
            <li><a href="/products">Shop</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h3>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded bg-white text-black placeholder:text-gray-500 focus:outline-none"
            />
            <button className="bg-rose-900 hover:bg-rose-700 transition-colors px-4 py-2 rounded text-white">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Vernika Jewels. All rights reserved.</p>
        <div className="flex gap-4 text-gray-400 text-xl">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaYoutube /></a>
          <a href="#"><FaTwitter /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
