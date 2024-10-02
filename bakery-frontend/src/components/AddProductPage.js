import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import axios from 'axios';

const AddProductPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // For redirection

  // Fetch all products from the API
  const fetchProducts = () => {
    axios.get('http://localhost:8000/api/products/')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error('Error fetching products!', error));
  };

  useEffect(() => {
    // Check if the user is authenticated (e.g., if token exists in localStorage)
    const token = localStorage.getItem('token');

    if (!token) {
      // If no token, redirect to login page
      navigate('/login');
    } else {
      // If authenticated, fetch products
      fetchProducts();
    }
  }, [navigate]); // The navigate dependency ensures this effect runs on page load

  return (
    <div className="min-h-screen bg-[#F7E7DA] p-8">
      {/* ปรับแต่ง Bakery Products ให้เด่น */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-white bg-gradient-to-r from-[#D2691E] to-[#A0522D] inline-block py-4 px-8 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          Bakery Products
        </h1>
      </div>

      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <ProductForm fetchProducts={fetchProducts} />
      </div>

      <div className="mt-8">
        <ProductTable products={products} fetchProducts={fetchProducts} />
      </div>
    </div>
  );
};

export default AddProductPage;
