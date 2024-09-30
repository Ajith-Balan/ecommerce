import React from 'react'
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Footer = () => {
  return (
    <div>
  <footer className="bg-red-600 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8">
          {/* About Link */}
          <Link
            to="/about"
            className="hover:text-white text-sm font-medium"
          >
            About
          </Link>
       
          {/* Privacy Link */}
          <Link
            to="/policy"
            className="hover:text-white text-sm font-medium"
          >
            Privacy Policy
          </Link>
          {/* Contact Link */}
          <Link
            to="/contact"
            className="hover:text-white text-sm font-medium"
          >
            Contact
          </Link>
        </div>
        {/* Copyright Section */}
        <div className="mt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CJ ATTIRE. All rights reserved. </p>
          <p >Powered by  <a
        href="https://www.instagram.com/ajith____b?igsh=MWVheHZiODdxaTh5dA=="
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        ajith-b
      </a> </p>

        </div>
      </div>
    </footer>    </div>
  )
}

export default Footer
