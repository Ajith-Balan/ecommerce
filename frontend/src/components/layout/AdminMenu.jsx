import React from 'react';
import { Link } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
        <Link 
          to="/dashboard/admin/create-category" 
          className="bg-gray-100 hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded shadow-md text-center"
        >
          Add/Create Category
        </Link>
        <Link 
          to="/dashboard/admin/create-product" 
          className="bg-gray-100 hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded shadow-md text-center"
        >
          Create Product
        </Link>
        <Link 
          to="/dashboard/admin/products" 
          className="bg-gray-100 hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded shadow-md text-center"
        >
          Products
        </Link>
    
        <Link 
          to="/dashboard/admin/orderslist" 
          className="bg-gray-100 hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded shadow-md text-center"
        >
          Orders List
        </Link>
      </div>
    </div>
  );
};

export default AdminMenu;
