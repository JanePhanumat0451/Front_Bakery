import React, { useState } from 'react';
import axios from 'axios';


const ProductForm = ({ fetchProducts }) => {
  const [product, setProduct] = useState({ name: '', type: '', description: '', price: '' });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);


  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');


    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('type', product.type);
    formData.append('description', product.description);
    formData.append('price', product.price);
    if (image) {
      formData.append('image', image);
    }


    axios.post('http://localhost:8000/api/products/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        fetchProducts();
        setProduct({ name: '', type: '', description: '', price: '' });
        setImage(null);
        setPreviewImage(null);
      })
      .catch((error) => {
        console.error('There was an error!', error);
        setError('Error adding product. Please try again.');
      });
  };


  return (
    <form onSubmit={handleSubmit} className="bg-[#f3e4d2] p-8 rounded-lg shadow-xl max-w-lg mx-auto transition-all hover:shadow-2xl duration-300">
      <h2 className="text-3xl font-bold text-[#8B4513] mb-6 text-center">Add New Product</h2>
      <div>
        <label className="block text-[#A0522D] font-medium mb-2">Product Name:</label>
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full p-2 border border-[#DEB887] rounded focus:outline-none focus:ring-2 focus:ring-[#A0522D] mb-4"
          required
        />
      </div>
      <div>
        <label className="block text-[#A0522D] font-medium mb-2">Product Type:</label>
        <input
          name="type"
          value={product.type}
          onChange={handleChange}
          className="w-full p-2 border border-[#DEB887] rounded focus:outline-none focus:ring-2 focus:ring-[#A0522D] mb-4"
          required
        />
      </div>
      <div>
        <label className="block text-[#A0522D] font-medium mb-2">Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full p-2 border border-[#DEB887] rounded focus:outline-none focus:ring-2 focus:ring-[#A0522D] mb-4"
          required
        />
      </div>
      <div>
        <label className="block text-[#A0522D] font-medium mb-2">Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="w-full p-2 border border-[#DEB887] rounded focus:outline-none focus:ring-2 focus:ring-[#A0522D] mb-4"
          required
        />
      </div>
      <div>
        <label className="block text-[#A0522D] font-medium mb-2">Upload Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="w-full p-2 border border-[#DEB887] rounded mb-4"
          accept="image/*"
        />
        {previewImage && <img src={previewImage} alt="Preview" className="mt-4 w-full rounded-lg shadow-lg" />}
      </div>
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      <button type="submit" className="w-full py-3 bg-[#D2691E] text-white font-bold rounded-lg hover:bg-[#A0522D] transition-all duration-300 transform hover:scale-105">
        Add Product
      </button>
    </form>
  );
};


export default ProductForm;
