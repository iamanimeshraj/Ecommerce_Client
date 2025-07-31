import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const Register = () => {
  const navigate = useNavigate();
  const {registerUser}=useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const {name,email,password}=formData

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setError("");

  const success = await registerUser(name, email, password);

  if (success) {
    navigate("/login");
  } else {
    setError("Registration failed. Try again."); // optional feedback
  }
};

  return (
    <div className=" mt-10 min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#a30e0e]">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#a30e0e]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#a30e0e]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-1 border rounded px-3 py-2 pr-10 outline-none focus:ring-1 focus:ring-[#a30e0e]"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-sm text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#a30e0e]"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#a30e0e] text-white py-2 rounded hover:bg-[#831010] transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-[#a30e0e] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
