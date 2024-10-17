import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/Auth';
import qr from '../../../src/assets/paymentqr.jpeg'
const Payment = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const { id } = useParams();
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for confirming order

  const [state, setState] = useState({
    productName: "",
    productPrice: "",
    productphoto: "",
    productDescription: "",
    quantity: 1,
    totalPrice: 0,
    userName: auth?.user?.name || '',
    userid: auth?.user?._id || '',
    userPhone: auth?.user?.phone || '',
    user2Phone: '',
    userAddress: auth?.user?.address || '',
    size: '',
    loading: true,
  });

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    if (state.productPrice && state.quantity) {
      setState(prevState => ({
        ...prevState,
        totalPrice: prevState.productPrice * prevState.quantity,
      }));
    }
  }, [state.productPrice, state.quantity]);

  const getProduct = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/product/getone-product/${id}`);
      const product = res.data;
      setState(prevState => ({
        ...prevState,
        productName: product.name,
        productphoto: product.photo,
        productDescription: product.description,
        productPrice: product.price,
        size: product.size , // Make sure you have size options in product
        loading: false,
        totalPrice: product.price * prevState.quantity,
      }));
    } catch (error) {
      console.log(error);
      setState(prevState => ({
        ...prevState,
        loading: false,
      }));
      toast.error("Failed to load product details");
    }
  };

  const handleQuantityChange = (operation) => {
    setState(prevState => {
      const newQuantity = operation === 'increase'
        ? prevState.quantity + 1
        : prevState.quantity > 1
        ? prevState.quantity - 1
        : prevState.quantity;
      return {
        ...prevState,
        quantity: newQuantity,
        totalPrice: prevState.productPrice * newQuantity,
      };
    });
  };

  const sizes = state.size.split('/');




  const handleScreenshotChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Check if file size is greater than 2MB
        toast.error("File size exceeds 2MB limit");
        return;
      }
      setPhoto(await convertToBase64(file));
    }
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }


  const handleConfirm = async () => {
    setLoading(true); // Set loading to true when confirming
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/orders`, { state, photo });
      if (res.data.success) {
        toast.success("Order confirmed!");
        setTimeout(() => {
          navigate(`/dashboard/user/orders/${auth.user._id}`);
        }, 1000);
      } else {
        toast.error(res.data.message || "Failed to confirm order");
      }
    } catch (error) {
      console.error("Order confirmation failed:", error);
      toast.error("Failed to confirm order");
    } finally {
      setLoading(false); // Reset loading state after confirmation
    }
  };

  return (
    <Layout>
      {state.loading ? (
        <div className="text-center text-xl font-semibold">Loading...</div>
      ) : (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <form className="bg-white shadow-md rounded p-6">
            <hr className="mb-4" />
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="name"
                value={state.productName}
                readOnly
              />
            </div>
            <div className="mb-4">
              <img src={state.productphoto} alt="" />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="description"
                value={state.productDescription}
                readOnly
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="price"
                value={state.productPrice.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'INR',
                })}
                readOnly
              />
            </div>

            {/* Quantity and Total Price */}
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">Quantity</label>
              <div className="flex items-center">
                <button
                  type="button"
                  className="px-3 py-2 bg-gray-300 text-gray-700 rounded-l focus:outline-none"
                  onClick={() => handleQuantityChange('decrease')}
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-16 text-center px-3 py-2 border-t border-b shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="quantity"
                  value={state.quantity}
                  readOnly
                />
                <button
                  type="button"
                  className="px-3 py-2 bg-gray-300 text-gray-700 rounded-r focus:outline-none"
                  onClick={() => handleQuantityChange('increase')}
                >
                  +
                </button>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-4">
              <select
                id="size"
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={state.size}
                onChange={(e) => setState({ ...state, size: e.target.value })}
              >
                {sizes.map((Size) => (
                  <option key={Size} value={Size}>
                    {Size}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label>Total Price</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={state.totalPrice.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'INR',
                })}
                readOnly
              />
            </div>
          </form>

          {/* User Info and Confirmation */}
          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-2xl font-bold mb-4">Deliver to:</h2>
            <hr className="mb-4" />
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="username"
                value={state.userName}
                readOnly
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="userPhone"
                value={state.userPhone}
                readOnly
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="user2Phone"
                placeholder="Phone number 2"
                value={state.user2Phone}
                onChange={(e) => setState({ ...state, user2Phone: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="userAddress"
                value={state.userAddress} 
                placeholder="Enter your full address"

                onChange={(e) => setState({ ...state, userAddress: e.target.value })}
              />
            </div>
            <div className="mb-4 p-4 border rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
      
      <div className="mb-2">
        <img 
          src={qr} // Replace with the actual path to your QR code image
          alt="Payment QR Code"
          className="w-32 h-32"
        />
      </div>
      <div className="mb-2">
        <p className="font-medium">Name : <span className="font-light">CJ ATTIRE</span></p>
      </div>
      <div className="mb-2">
        <p className="font-medium">Bank  :<span className="font-light">Union Bank of India</span></p>
      </div>
      <div className="mb-2">
        <p className="font-medium">Account Number: <span className="font-light">339502120000315</span></p>
      </div>
      
      <div className="mb-2">
        <p className="font-medium">IFSC Code: <span className="font-light">UBINO533955</span></p>
      </div>
      
      <div>
        <p className="text-sm text-gray-500">Scan the QR code or use the account details above for payment.</p>
      </div>
    </div>


            <div className="mb-4">
              <label htmlFor="screenshot" className="block text-gray-700 font-medium mb-2">Upload Screenshot of Payment</label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 border rounded p-2"
                onChange={handleScreenshotChange}
              />
            </div>

            <button
              onClick={handleConfirm}
              className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Confirming...' : 'Confirm Order'}
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Payment;
