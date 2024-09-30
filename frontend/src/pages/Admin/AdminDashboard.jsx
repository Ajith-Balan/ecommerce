import React from 'react'
import Layout from "../../components/layout/Layout"
import { useAuth } from '../../context/Auth'
import AdminMenu from '../../components/layout/AdminMenu.jsx'
const AdminDashboard = () => {
    const [auth] = useAuth()
  return (
  <div>
    <Layout title={'Dashboard -Admin'}>
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-200 p-4 rounded">
<AdminMenu/>
        </div>
        <div className="bg-gray-200 p-4 rounded">
          <h1>{auth?.user?.name}</h1>       
          <h1>{auth?.user?.email}</h1>       
          <h1>{auth?.user?.phone}</h1>       
          </div>
      </div>
    </div>    </Layout>
  </div>
  )
}

export default AdminDashboard
