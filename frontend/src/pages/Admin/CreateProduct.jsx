import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu'; // Corrected import casing
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    photo: '',
    photo2: '',
    photo3: '',
    photo4: '',
    photo5: '',
    size: '',
    description: '',
    price: '',
    MRP:'',
    quantity: '',
    category: '',
  });

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong in getting categories');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Create product
  const handleCreate = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!product.name || !product.price || !product.quantity || !product.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/api/v1/product/create-product`, product);
      if (data?.success) {
        toast.success(data?.message);
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 1000); 
      } else {
        toast.error(data?.message || 'Product creation failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while creating the product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container mx-auto py-6 px-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-6 md:mb-0">
            <AdminMenu />
          </div>
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold mb-6">Create Product</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={product.category}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  placeholder="Product name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="photo"
                  value={product.photo}
                  placeholder="Front photo Link"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="photo2"
                  value={product.photo2}
                  placeholder="Product photo Link 2"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>  <div>
                <input
                  type="text"
                  name="photo3"
                  value={product.photo3}
                  placeholder="Product photo Link 3"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>  <div>
                <input
                  type="text"
                  name="photo4"
                  value={product.photo4}
                  placeholder="Product photo Link 4"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>  <div>
                <input
                  type="text"
                  name="photo5"
                  value={product.photo5}
                  placeholder="Product photo Link 5"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>

              <div>
                <textarea
                  name="description"
                  value={product.description}
                  placeholder="Product description"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  placeholder="Sales price"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <input
                  type="number"
                  name="MRP"
                  value={product.MRP}
                  placeholder="MRP"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>

              
              <div>
                <input
                  type="text"
                  name="size"
                  value={product.size}
                  placeholder="enter Size like S/M/L/XL"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  placeholder="Quantity"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>

           

              <div>
                <button
                  className={`w-full py-2 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-lg hover:bg-blue-700 transition duration-300`}
                  onClick={handleCreate}
                  disabled={loading} // Disable button during loading
                >
                  {loading ? 'Creating...' : 'CREATE PRODUCT'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
