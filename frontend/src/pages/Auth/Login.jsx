import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      
      });
      const [auth, setAuth]= useAuth()
    
      const navigate = useNavigate();
      const location = useLocation()
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
   
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/login`, formData);
          if (res.status === 404) {
            toast.error(res.data.msg);
           
          }else if(res.status === 405) {
            toast.error('Email is not registerd');
    
          }
          else if(res.status === 200){
            toast.success('Login successfully');
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token
            });
            localStorage.setItem('auth', JSON.stringify(res.data));
            setTimeout(() => {
                navigate(location.state || '/');
              }, 1000);
          }
        } catch (error) {
          console.error(error);
          toast.error('Something went wrong');
        }
      };
    
      return (
        <div>
          <Layout title={'Login E-commerce app'}>
            <div className="flex justify-center items-center h-screen bg-gray-100">
              <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
         
    
                  <div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
    
              
    
                  <div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
    

    
         
    
                  <button
                    type="submit"
                    className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Sign in
                  </button>
                  <div className='flex justify-between'>
                    <Link className='text-blue-500 underline' to={'/forget'}>forgot Password</Link>
                    <p>new user? <Link  className="text-blue-600 underline" to={'/register'}>Sign up</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </Layout>
        </div>
  )
}

export default Login
