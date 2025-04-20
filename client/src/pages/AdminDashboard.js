import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Link to={"/all-orders"}>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Orders</h2>
            <p className="text-gray-600 mb-4">View and manage all orders</p>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">View Orders</button>
          </div>
          </Link>

          {/* Card 2 */}
          <Link to={'/foodaddadmin'}>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Add Products</h2>
            <p className="text-gray-600 mb-4">View and manage all products</p>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">View Products</button>
          </div>
</Link>
          {/* Card 3 */}
          <Link to={'/all-users'}>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Users</h2>
            <p className="text-gray-600 mb-4">View and manage all users</p>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">View Users</button>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

