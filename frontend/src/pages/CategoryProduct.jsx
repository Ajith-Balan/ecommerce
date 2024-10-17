import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const CategoryProduct = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});

    const getProductByCat = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/product/product-category/${id}`);
            setProducts(res.data.products);
            setCategory(res.data.category);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (id) getProductByCat();
    }, [id]);

    return (
        <Layout>
            
           <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-8 text-center">{category.name}</h1>
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
</div>

        </Layout>
    );
};

export default CategoryProduct;
