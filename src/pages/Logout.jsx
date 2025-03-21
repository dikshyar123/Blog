import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Added useNavigate
import { User } from "../contextApi.jsx/UserAuthApi";
import { toast } from "react-toastify"; // Import toast

function Navbar() {
  const [data, setData] = useContext(User);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    setData(null); // Clear user data
    toast.success("You have logged out successfully!"); // Show success toast
    navigate("/logout"); // Redirect to logout page
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-red-500">Logo</h1>
      
      <div className="flex gap-6">
        <NavLink to="/home" className="text-lg font-medium text-gray-700 hover:text-red-500">Home</NavLink>

        {!data ? (
          <>
            <NavLink to="/login" className="text-lg font-medium text-gray-700 hover:text-red-500">Login</NavLink>
            <NavLink to="/signup" className="text-lg font-medium text-gray-700 hover:text-red-500">Sign Up</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/profile" className="text-lg font-medium text-gray-700 hover:text-red-500">Profile</NavLink>
            <NavLink to="/blog" className="text-lg font-medium text-gray-700 hover:text-red-500">Blog</NavLink>
            <button onClick={handleLogout} className="text-lg font-medium text-red-600 hover:text-red-700 transition-all">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
