import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
  const location = useLocation();
  const cart = location.state.cart || []; // รับข้อมูลตะกร้าจาก ProductCart
  const [deliveryMethod, setDeliveryMethod] = useState('store_pickup');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [mapLink, setMapLink] = useState('');
  const navigate = useNavigate();

  // ตั้งเวลาและวันที่อัตโนมัติเมื่อเลือก "Pick up at Store"
  useEffect(() => {
    if (deliveryMethod === 'store_pickup') {
      const now = new Date();
      const defaultTime = now.toTimeString().slice(0, 5); // เอาเฉพาะส่วนของเวลา (HH:mm)
      const defaultDate = now.toISOString().slice(0, 10); // เอาเฉพาะส่วนของวันที่ (YYYY-MM-DD)
      setDeliveryTime(defaultTime); // ตั้งค่าเวลาอัตโนมัติ
      setDeliveryDate(defaultDate); // ตั้งค่าวันที่อัตโนมัติ
    } else {
      setDeliveryTime(''); // รีเซ็ตเวลาเมื่อเปลี่ยนเป็นวิธีการจัดส่งอื่น
      setDeliveryDate(''); // รีเซ็ตวันที่เมื่อเปลี่ยนเป็นวิธีการจัดส่งอื่น
    }
  }, [deliveryMethod]);

  // ฟังก์ชันยืนยันคำสั่งซื้อและบันทึกคำสั่งซื้อ
  const handleConfirmOrder = async () => {
    // ตรวจสอบว่ากรณีจัดส่งต้องกรอกข้อมูลให้ครบถ้วน
    if (deliveryMethod === 'home_delivery' && (!address || !deliveryDate || !deliveryTime || !mapLink || cart.length === 0)) {
      alert('Please fill in all required fields.');
      return;
    }

    const orderData = {
      delivery_method: deliveryMethod,
      address: deliveryMethod === 'home_delivery' ? address : null, // ใส่ข้อมูลที่อยู่เฉพาะเมื่อจัดส่ง
      delivery_date: deliveryDate, // ใช้ deliveryDate ที่อาจตั้งค่าอัตโนมัติ
      delivery_time: deliveryTime, // ใช้ deliveryTime ที่อาจตั้งค่าอัตโนมัติ
      map_link: deliveryMethod === 'home_delivery' ? mapLink : null,
      items: cart.map(item => ({
        product_name: item.name,
        product_price: item.price,
        quantity: item.quantity
      })),
    };

    try {
      await axios.post('http://localhost:8000/api/orders/', orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // แสดงข้อความสำเร็จ
      alert('Order placed successfully!');

      // ตั้งเวลาเพื่อให้รอการแสดง alert สักครู่ก่อนนำทางไปหน้าอื่น
      setTimeout(() => {
        navigate('/'); // นำทางไปยังหน้าแรกหลังจากการแจ้งเตือน
      }, 2000); // หน่วงเวลา 2 วินาทีก่อนที่จะนำทาง
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5E6CC] p-8 flex justify-center items-center">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-[#8B4513] bg-gradient-to-r from-[#D2B48C] to-[#DEB887] inline-block py-4 px-8 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          Checkout
        </h2>

        {/* Display Cart Items */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4">Your Cart</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>{item.price} THB</span>
              </li>
            ))}
          </ul>
          <hr className="my-4" />
        </div>

        {/* Delivery Method */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4">Choose Delivery Method</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="deliveryMethod"
                value="store_pickup"
                checked={deliveryMethod === 'store_pickup'}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                className="form-radio h-5 w-5 text-[#A0522D]"
              />
              <span className="ml-2 text-lg">Pick up at Store</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="deliveryMethod"
                value="home_delivery"
                checked={deliveryMethod === 'home_delivery'}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                className="form-radio h-5 w-5 text-[#A0522D]"
              />
              <span className="ml-2 text-lg">Home Delivery</span>
            </label>
          </div>
        </div>

        {/* Delivery Information - Show only if home delivery is selected */}
        {deliveryMethod === 'home_delivery' && (
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">Delivery Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-lg">Delivery Details</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 mt-2 border rounded-lg focus:outline-none focus:border-[#A0522D]"
                  placeholder="Enter your address"
                />
              </div>

              <div>
                <label className="block text-lg">Delivery Date</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full p-2 mt-2 border rounded-lg focus:outline-none focus:border-[#A0522D]"
                />
              </div>

              <div>
                <label className="block text-lg">Delivery Time</label>
                <input
                  type="time"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full p-2 mt-2 border rounded-lg focus:outline-none focus:border-[#A0522D]"
                />
              </div>

              <div>
                <label className="block text-lg">Google Map Link</label>
                <input
                  type="url"
                  value={mapLink}
                  onChange={(e) => setMapLink(e.target.value)}
                  className="w-full p-2 mt-2 border rounded-lg focus:outline-none focus:border-[#A0522D]"
                  placeholder="Enter Google Map link"
                />
              </div>
            </div>
          </div>
        )}

        {/* Confirm Order Button */}
        <button
          className="w-full bg-[#D2691E] text-white py-3 rounded-lg hover:bg-[#A0522D] transition duration-300 font-semibold text-lg"
          onClick={handleConfirmOrder}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
