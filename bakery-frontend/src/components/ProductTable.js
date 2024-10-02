import React, { useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductTable = ({ products, fetchProducts }) => {
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    price: '',
    image: null
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/products/${id}/`);
      alert('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting the product:', error);
      alert('Error deleting the product. Please try again.');
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      type: product.type,
      description: product.description,
      price: product.price,
      image: null
    });
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSave = async () => {
    if (!editProduct) {
      alert('Product ID is missing.');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('type', formData.type);
      data.append('description', formData.description);
      data.append('price', formData.price);
      if (formData.image) {
        data.append('image', formData.image);
      }

      await axios.put(`http://localhost:8000/api/products/${editProduct.id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Product updated successfully');
      setEditProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating the product:', error);
      alert('Error updating the product. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditProduct(null);
  };

  return (
    <div className="container mx-auto py-8">
      {products.length > 0 ? (
        <table className="table-auto w-full bg-[#f7e7da] rounded-lg shadow-md"> {/* พื้นหลังตารางเป็นสีครีมน้ำตาลอ่อน */}
          <thead className="bg-[#d2b48c] text-white"> {/* พื้นหลังหัวตารางเป็นสีครีมน้ำตาลเข้ม */}
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.map((product, index) => (
              <tr key={product.id} className={index % 2 === 0 ? 'bg-[#faeee7]' : 'bg-[#fcefe3]'}> {/* สีพื้นหลังสลับของแต่ละแถว */}
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  <img src={product.image} alt={product.name} className="w-16 h-auto mx-auto" />
                </td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.type}</td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2 flex justify-center space-x-4">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditClick(product)}
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-lg">No products available. Please add some!</p>
      )}

      {editProduct && (
        <div className="mt-8 p-4 bg-[#fbead1] rounded-lg shadow-md"> {/* พื้นหลังของฟอร์มเป็นสีครีมน้ำตาลอ่อน */}
          <h3 className="text-xl font-bold mb-4">Edit Product</h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="block w-full p-2 mb-4 border rounded-md"
            placeholder="Name"
          />
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="block w-full p-2 mb-4 border rounded-md"
            placeholder="Type"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="block w-full p-2 mb-4 border rounded-md"
            placeholder="Description"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="block w-full p-2 mb-4 border rounded-md"
            placeholder="Price"
          />
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            accept="image/*"
            className="block w-full p-2 mb-4 border rounded-md"
          />
          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;

