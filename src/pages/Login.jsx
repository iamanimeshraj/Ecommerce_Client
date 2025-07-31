import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Login = () => {
const {loginUser}= useContext(AppContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {email,password}=form
    console.log('Login submitted:', form);
    const success=await loginUser(email,password)
    if(success){navigate('/')}
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#a30e0e]">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#a30e0e]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-[#a30e0e]"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-500 focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#a30e0e] text-white py-2 rounded hover:bg-[#831010] transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <a href="/register" className="text-[#a30e0e] hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
