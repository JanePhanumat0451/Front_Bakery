import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); // ใช้ navigate เพื่อนำทาง

  // ตรวจสอบว่าผู้ใช้ล็อกอินหรือไม่
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // ถ้าไม่มี token ให้เปลี่ยนเส้นทางไปที่หน้า login
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/orders/');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5E6CC] py-12">
      <div className="container mx-auto px-6">
        {/* Header Title */}
        <h2 className="text-5xl font-extrabold text-center mb-10 text-[#8B4513] bg-gradient-to-r from-[#D2B48C] to-[#DEB887] inline-block py-4 px-8 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          Admin Orders
        </h2>

        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              {/* Table Header */}
              <thead className="bg-[#D2B48C] text-white">
                <tr>
                  <th className="text-left py-4 px-4 uppercase font-semibold text-sm">Order ID</th>
                  <th className="text-left py-4 px-4 uppercase font-semibold text-sm">Delivery Method</th>
                  <th className="text-left py-4 px-4 uppercase font-semibold text-sm">Delivery Details</th>
                  <th className="text-left py-4 px-4 uppercase font-semibold text-sm">Delivery Date</th>
                  <th className="text-left py-4 px-4 uppercase font-semibold text-sm">Delivery Time</th>
                  <th className="text-left py-4 px-4 uppercase font-semibold text-sm">Map Link</th>
                  <th className="text-left py-4 px-4 uppercase font-semibold text-sm">Total Amount</th>
                  <th className="text-left py-4 px-4 uppercase font-semibold text-sm">Items</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="text-gray-800">
                {orders.map((order) => (
                  <tr key={order.id} className="border-b bg-[#FFF8DC] hover:bg-[#F5DEB3] transition-all duration-300">
                    <td className="py-3 px-4">{order.id}</td>
                    {/* เปลี่ยนจาก payment_method เป็น delivery_method */}
                    <td className="py-3 px-4">{order.delivery_method}</td>
                    <td className="py-3 px-4">{order.address}</td>
                    <td className="py-3 px-4">{order.delivery_date}</td>
                    <td className="py-3 px-4">{order.delivery_time}</td>
                    <td className="py-3 px-4">
                      <a href={order.map_link} target="_blank" rel="noopener noreferrer" className="text-[#A0522D] underline hover:text-[#8B4513]">
                        Map Link
                      </a>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      ${Array.isArray(order.items) ? order.items.reduce((acc, item) => acc + parseFloat(item.product_price) * item.quantity, 0).toFixed(2) : '0.00'}
                    </td>
                    <td className="py-3 px-4">
                      {/* Display each product in the order */}
                      <ul>
                        {Array.isArray(order.items) && order.items.map((item, index) => (
                          <li key={index}>
                            {item.product_name} x {item.quantity} - ${parseFloat(item.product_price).toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">No orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrderPage;

