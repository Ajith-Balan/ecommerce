import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import { useParams } from 'react-router-dom';
import UserMenu from '../../components/layout/UserMenu';

const Orders = () => {
  const { userid } = useParams();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      if (auth?.user?._id) {
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/getorders/${userid}`);
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.error(error);
      setError('Error fetching orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  // Mapping of status to colors
  const statusColors = {
    Pending: 'bg-yellow-300 text-black',
    Shipped: 'bg-blue-300 text-black',
    Delivered: 'bg-green-300 text-black',
    Cancelled: 'bg-red-300 text-black',
  };

  return (
    <Layout title={"Your Orders"}>
      <UserMenu/>
      <div className="container mx-auto p-5">
        <div className="w-3/4 p-5 bg-white rounded-lg shadow-lg mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">All Orders</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {orders.length === 0 ? (
            <div className="text-center text-gray-500">No orders found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map((order, index) => (
                <div key={order._id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
                  <h2 className="font-semibold">{order.productName}</h2>
                  <img src={order.productphoto} alt={order.productName} className="mt-2 mb-2 w-full h-48 object-cover rounded-md shadow-sm" />
                  <div className="flex justify-between">
                    <span className="font-bold">Quantity:</span>
                    <span>{order.quantity}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-bold">Amount:</span>
                    <span>₹{order.totalPrice}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-bold">Payment:</span>
                    <span>{order.payment}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-bold">Status:</span>
                    <span className={`p-1 rounded-md ${statusColors[order.status] || 'bg-gray-200'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
