import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/Auth';
import { toast } from 'react-toastify';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import logo from '../../assets/Black White Elegant Monogram Initial Name Logo_20240606_180138_0000.png'

const Header = () => {
  const categories = useCategory();
  const [isOpen, setIsOpen] = useState(false); // Toggle for mobile menu
  const [isOpend, setIsOpend] = useState(false); // Toggle for user dropdown
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // Toggle for category dropdown
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsOpend(!isOpend);
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    toast.success('Logout successfully');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const dashboardPath = `/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`; // Dynamic dashboard path

  return (
    <nav className="bg-red-600  w-full top-0">
      <div className="max-w-7xl   mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-lg font-bold">
              <img
                className="h-8 w-auto rounded"
                src={logo} // Replace with actual logo URL
                alt="Logo"
              />
            </Link>
          </div>

          {/* Hamburger Icon for mobile */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Links for large screens */}
          <div className="hidden sm:flex space-x-4">
            <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            
            {/* Category Dropdown */}
            <div className="relative inline-block text-left">
              <button
                onClick={toggleCategoryDropdown}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-sm font-medium text-white hover:bg-gray-500"
              >
                Categories
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Category Dropdown Panel */}
              {isCategoryOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                  <div className="py-1">
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        to={`/category/${category._id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {!auth.user ? (
              <>
                <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Register
                </Link>
                <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
              </>
            ) : (
              <>
                <div className="relative inline-block text-left">
                  <button
                    onClick={toggleDropdown}
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-sm font-medium text-white hover:bg-gray-500"
                  >
                    {auth?.user?.name}
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Panel */}
                  {isOpend && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                      <div className="py-1">
                        <Link to={dashboardPath} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Dashboard
                        </Link>
                        <div
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          Logout
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            <Link to="/cart" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Cart {cart?.length}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">
            Home
          </Link>

          {/* Mobile Category Dropdown */}
          <div className="relative">
            <button
              onClick={toggleCategoryDropdown}
              className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Categories
            </button>
            {isCategoryOpen && (
              <div className="mt-1 bg-white rounded-md shadow-lg z-20">
                <div className="py-1">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      to={`/category/${category._id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!auth.user ? (
            <>
              <Link to="/register" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                Register
              </Link>
              <Link to="/login" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to={dashboardPath} className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                Dashboard
              </Link>
              <div
                onClick={handleLogout}
                className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium cursor-pointer"
              >
                Logout
              </div>
            </>
          )}
          <Link to="/cart" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">
            Cart {cart?.length}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
