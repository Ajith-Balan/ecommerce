import React, { useState,useRef, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProductDetails = () => {

  const carouselRef = useRef(null);

  const handlePrev = () => {
      const carousel = carouselRef.current;
      // Move the last image to the front
      const lastChild = carousel.lastElementChild;
      carousel.insertBefore(lastChild, carousel.firstElementChild);
  };

  const handleNext = () => {
      const carousel = carouselRef.current;
      // Move the first image to the end
      const firstChild = carousel.firstElementChild;
      carousel.appendChild(firstChild);
  };


  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND}/api/v1/product/getone-product/${id}`
      );
      setProduct({ ...res.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
       






        <div className="relative w-full max-w-xl mx-auto overflow-hidden">
            <div
                ref={carouselRef}
                className="flex transition-transform duration-500 h-full ease-in-out"
            >
                <div className="min-w-full">
                    <img
                        src={product.photo}
                        alt={product.name}
                        className="w-full h-auto"
                    />
                </div>
                <div className="min-w-full">
                    <img
                        src={product.photo2 || product.photo}
                        alt={product.name}
                        className="w-full h-auto"
                    />
                </div>
                <div className="min-w-full">
                    <img
                        src={product.photo3 || product.photo}
                        alt={product.name}
                        className="w-full h-auto"
                    />
                </div>
                <div className="min-w-full">
                    <img
                        src={product.photo4 || product.photo}
                        alt={product.name}
                        className="w-full h-auto"
                    />
                </div>
                <div className="min-w-full">
                    <img
                        src={product.photo5 || product.photo}
                        alt={product.name}
                        className="w-full h-auto"
                    />
                </div>
            </div>
            <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                onClick={handlePrev}
            >
                &lt;
            </button>
            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                onClick={handleNext}
            >
                &gt;
            </button>
        </div>






















        <div className="space-y-4">
          <hr className="border-gray-300" />
          <h6 className="text-lg font-semibold"> {product.name}</h6>
          <p>{product.size}</p>
          <p className="text-gray-700"> {product.description}</p>
          <div className="flex gap-2 mt-2">
            <h3 className="text-red-500 line-through">
      ₹{product.MRP}
    </h3>
    <h2 className="text-xl text-green-600 font-bold">
      ₹{product.price}
    </h2>
    

  </div>
              {product.MRP > product.price && (
    <div className="text-md text-green-500 mr-1 font-semibold mt-1">
      {Math.round(((product.MRP - product.price) / product.MRP) * 100)}% off
    </div>
  )}
          <div className="w-full flex fixed bottom-0 left-0 right-0  shadow-lg">
  <button
    className="bg-gray-700 text-white w-1/2 py-2  hover:bg-gray-600 transition"
    onClick={() => {
      setCart([...cart, product]);
      localStorage.setItem('cart', JSON.stringify([...cart, product]));
      toast.success('Item added to cart');
    }}
  >
    Add to Cart
  </button>
  <Link
    className="bg-blue-500 text-center text-white w-1/2 py-2 hover:bg-blue-400 transition"
    to={`/dashboard/user/payment/${product._id}`}
  >
    Buy Now
  </Link>
</div>

  
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Layout>
  );
};

export default ProductDetails;
