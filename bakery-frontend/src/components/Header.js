import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.svg'; // Adjust the path to your logo file

export default function Header() {
  const navigate = useNavigate();

  // Check if the user is logged in by verifying if a token exists
  const isLoggedIn = localStorage.getItem("token");

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to the login page
  };

  // If not logged in, return null to prevent the header from rendering
  if (!isLoggedIn) {
    return null;
  }

  return (
    <header className="flex items-center justify-between bg-[#FDF3E1] p-4 shadow-md">
      <div className="flex items-center">
        <img src={logo} alt="Bakery Logo" className="h-10 mr-4" />
        <h1 className="text-3xl font-extrabold text-[#D9825E]">BakeryHome</h1>
      </div>
      <nav className="flex-1 flex justify-center space-x-6">
        <Link to="/" className="text-lg font-medium text-[#603913] hover:text-[#D9825E] transition-colors duration-300">
          Home
        </Link>
        <Link to="/add-product" className="text-lg font-medium text-[#603913] hover:text-[#D9825E] transition-colors duration-300">
          Add Product
        </Link>
        <Link to="/products" className="text-lg font-medium text-[#603913] hover:text-[#D9825E] transition-colors duration-300">
          Products
        </Link>
        <Link to="/adminorders" className="text-lg font-medium text-[#603913] hover:text-[#D9825E] transition-colors duration-300">
          Admin Orders
        </Link>
        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="text-lg font-medium text-[#603913] hover:text-[#D9825E] transition-colors duration-300">
          Logout
        </button>
      </nav>
    </header>
  );
}




