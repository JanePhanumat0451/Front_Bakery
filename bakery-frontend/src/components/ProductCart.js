import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductCart = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Check if the user is logged in by looking for a token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products/');
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to add a product to the cart
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove a product from the cart
  const handleRemoveFromCart = (product) => {
    setCart(cart.filter(item => item.id !== product.id));
  };

  // Increase the quantity of a product in the cart
  const handleIncreaseQuantity = (product) => {
    setCart(
      cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease the quantity of a product in the cart
  const handleDecreaseQuantity = (product) => {
    if (product.quantity > 1) {
      setCart(
        cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      handleRemoveFromCart(product);
    }
  };

  // Checkout function
  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout', { state: { cart } });
    } else {
      alert('Your cart is empty.');
    }
  };

  // Calculate total amount
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Group products by their type
  const groupedProducts = products.reduce((grouped, product) => {
    const { type } = product;
    if (!grouped[type]) {
      grouped[type] = [];
    }
    grouped[type].push(product);
    return grouped;
  }, {});

  return (
    <div className="min-h-screen bg-[#F5E6CC] p-8">
      {/* Shopping Cart title */}
      <div className="text-center mb-8">
        <h2 className="text-5xl font-extrabold text-white bg-gradient-to-r from-[#D2691E] to-[#A0522D] inline-block py-4 px-8 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          Shopping Cart
        </h2>
      </div>

      {/* Display products grouped by type */}
      {Object.keys(groupedProducts).map((type) => (
        <div key={type} className="mb-10">
          <h3 className="text-3xl font-semibold text-[#A0522D] mb-4 p-2 bg-[#f0c998] rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">{type}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedProducts[type].map(product => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                <img src={product.image || '/default-image.png'} alt={product.name} className="w-full h-40 object-cover mb-4 rounded" />
                <h3 className="text-xl font-semibold text-[#8B4513] mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold text-[#D2691E]">${product.price}</p>
                <button 
                  onClick={() => handleAddToCart(product)} 
                  className="w-full mt-4 bg-[#D2691E] text-white py-2 rounded hover:bg-[#A0522D] transition duration-300">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Display Cart */}
      <div className="mt-10">
        <h2 className="text-3xl font-semibold text-[#603913] mb-6">Your Cart</h2>
        {cart.length > 0 ? (
          cart.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-white p-4 mb-4 rounded-lg shadow-md">
              <div>
                <h3 className="text-xl font-semibold text-[#8B4513]">{item.name}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-lg font-bold text-[#D2691E]">Total: ${item.price * item.quantity}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleIncreaseQuantity(item)} 
                  className="bg-[#A0522D] text-white px-4 py-2 rounded hover:bg-[#8B4513] transition duration-300">
                  +
                </button>
                <button 
                  onClick={() => handleDecreaseQuantity(item)} 
                  className="bg-[#A0522D] text-white px-4 py-2 rounded hover:bg-[#8B4513] transition duration-300">
                  -
                </button>
                <button 
                  onClick={() => handleRemoveFromCart(item)} 
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      <div className="mt-6 text-right">
        <p className="text-xl font-bold text-[#D2691E]">Total Amount: ${totalAmount}</p>
      </div>

      <button 
        onClick={handleCheckout} 
        className="w-full mt-8 bg-[#D2691E] text-white py-3 rounded-lg hover:bg-[#A0522D] transition duration-300">
        Checkout
      </button>
    </div>
  );
};

export default ProductCart;
