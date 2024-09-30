import Layout from '../components/layout/Layout';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/Auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import useCategory from '../hooks/useCategory';
function Home() {
  const categories = useCategory();

  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state


  const getAllProducts = async () => {
    try {
            setLoading(true); // Start loading

      const { data } = await axios.get("http://localhost:3000/api/v1/product/get-product");
      setProducts(data);
            setLoading(false); // Stop loading

    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={'Shop Now'}>
      <div className='mt-10 '>

      {categories.map((category) => (
                         <Link
                         key={category._id}
                         to={`/category/${category._id}`}
                         className="inline-block p-2 mr-2 m-2 text-sm text-white transition-transform transform bg-gradient-to-r from-blue-500 to-blue-300 rounded-lg shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-red-400 hover:to-red-300 hover:scale-105 "
                       >
                         {category.name}
                       </Link>
                       
                       ))}
                     
                   







        <h1 className="text-2xl font-bold text-center mt-2 mb-6">All Products</h1>

        {/* Loading Indicator */}
        {loading ? (
  <div className="flex flex-col justify-center items-center min-h-screen">
  <h1 className="text-2xl font-bold text-center mb-4">
  </h1>
  <div className="relative w-16 h-16">
   
    <div className="absolute border-t-4 border-l-4 border-red-500 rounded-full w-8 h-8 animate-spin"></div>
  </div>
</div>        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products?.map((p) => (
              <div key={p._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Link to={`/product/${p._id}`}>
                  <div className="w-full h-60 lg:h-80">
                    <img
                      src={p.photo}
                      className="w-full h-full object-cover"
                      alt={p.name}
                    />
                  </div>
                  <div className="p-4">
  <h5 className="text-lg font-semibold mb-2">{p.name}</h5>
  <p className="text-gray-600">{p.description}</p>

  <div className="flex items-center justify-between mt-2">
    <h2 className="text-xl text-green-600 font-bold">
      ₹{p.price.toLocaleString('en-US')}
    </h2>
    <h3 className="text-red-500 line-through">
      ₹{p.MRP}
    </h3>
  </div>

  {p.MRP > p.price && (
    <div className="text-sm text-green-500 font-semibold mt-1">
       {Math.round(((p.MRP - p.price) / p.MRP) * 100)}% off
    </div>
  )}
</div>


                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <h1 className="text-center mt-6">E-commerce App</h1>
    </Layout>
  );
}

export default Home;
