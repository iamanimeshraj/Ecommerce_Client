import React, { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { Menu, X } from "lucide-react";

const ProfilePage = () => {
  const { setisAuthenticated, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setisAuthenticated(false);
    setToken(null);
    navigate("/login");
  };

  return (
    <div className="max-w-7xl mx-auto mt-20 p-4">
      <div className="md:hidden mb-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded shadow"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="font-medium">Profile Menu</span>
        </button>

        {mobileMenuOpen && (
          <div className="mt-3 space-y-2 bg-white p-4 rounded shadow">
            <NavLinks handleLogout={handleLogout} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block space-y-4 bg-white p-4 shadow rounded-xl h-fit">
          <h2 className="text-xl font-bold mb-4 text-[#a30e0e]">Profile Menu</h2>
          <NavLinks handleLogout={handleLogout} />
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3 bg-white p-6 shadow rounded-xl min-h-[300px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const NavLinks = ({ handleLogout }) => (
  <>
    <nav className="flex flex-col gap-2">
      <CustomNavLink to="" label="Overview" />
      <CustomNavLink to="orders" label="My Orders" />
      <CustomNavLink to="addresses" label="Saved Addresses" />
      <CustomNavLink to="reviews" label="My Reviews" />
      <CustomNavLink to="security" label="Security" />
    </nav>
    <button
      onClick={handleLogout}
      className="w-full bg-rose-900 text-white py-2 rounded hover:bg-red-600 transition mt-2"
    >
      Logout
    </button>
  </>
);

const CustomNavLink = ({ to, label }) => (
  <NavLink
    to={to}
    end={to === ""}
    className={({ isActive }) =>
      `px-4 py-2 rounded hover:bg-gray-100 ${
        isActive ? "bg-gray-200 font-semibold" : ""
      }`
    }
  >
    {label}
  </NavLink>
);

export default ProfilePage;
