import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; // Fixed incorrect import
import { User } from "../contextApi.jsx/UserAuthApi";

function Navbar() {
  const navigate = useNavigate();
  const [data, setData] = useContext(User);
  function LOGOUT(){
    localStorage.removeItem("auth");
    navigate("/login");
    setData(null);
  }
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-red-500">Logo</h1>

      {/* Navigation Links */}
      <div className="flex gap-8">
        <NavLink
          to="/home"
          className="text-lg font-medium text-gray-700 hover:text-red-500 transition-all"
        >
          Home
        </NavLink>

        {!data ? (
          <>
            <NavLink
              to="/login"
              className="text-lg font-medium text-gray-700 hover:text-red-500 transition-all"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="text-lg font-medium text-gray-700 hover:text-red-500 transition-all"
            >
              Sign Up
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/profile"
              className="text-lg font-medium text-gray-700 hover:text-red-500 transition-all"
            >
              Profile
            </NavLink>
            <NavLink
              to="/blog"
              className="text-lg font-medium text-gray-700 hover:text-red-500 transition-all"
            >
              Blog
            </NavLink>
            <button onClick={LOGOUT}
              to="/logout"
              className="text-lg font-medium text-gray-700 hover:text-red-500 transition-all"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
