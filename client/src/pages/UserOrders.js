import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/shopcontext';
import { AuthContext } from '../context/authcontext';
import { Link } from 'react-router-dom';

const UserOrders = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const { order } = useContext(ShopContext);
  const { user } = useContext(AuthContext);
  // const [userorder, setuserorder] = useState(order)
  // console.log(order);
  // console.log(userorder);

  const userOrders = order.filter(order => order.userId._id === user.id);
  // console.log(userOrders);


  return (
    // <div>
    //   <div>
    //     <h2>Pending Orders</h2>
    //     {userOrders.filter(order => order.status === "pending").map((order) => (
    //       <div key={order.id}>
    //         <p>Order ID: {order._id}</p>
    //         <p>Status: {order.status}</p>
    //       </div>
    //     ))}
    //   </div>
    //   <div>
    //     <h2>Shipped Orders</h2>
    //     {userOrders.filter(order => order.status === "shipped").map((order) => (
    //       <div key={order.id}>
    //         <p>Order ID: {order.id}</p>
    //         <p>Status: {order.status}</p>
    //       </div>
    //     ))}
    //   </div>
    //   <div>
    //     <h2>Delivered Orders</h2>
    //     {userOrders.filter(order => order.status === "delivered").map((order) => (
    //       <div key={order.id}>
    //         <p>Order ID: {order.id}</p>
    //         <p>Status: {order.status}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="max-w-6xl mx-auto p-4 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h2>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab("pending")}
            className={`py-4 px-6 text-sm font-medium ${activeTab === "pending"
              ? "border-b-2 border-orange-500 text-orange-500"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Pending Orders
          </button>
          <button
            onClick={() => setActiveTab("shipped")}
            className={`py-4 px-6 text-sm font-medium ${activeTab === "shipped"
              ? "border-b-2 border-orange-500 text-orange-500"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Shipped Orders
          </button>
          <button
            onClick={() => setActiveTab("delivered")}
            className={`py-4 px-6 text-sm font-medium ${activeTab === "delivered"
              ? "border-b-2 border-orange-500 text-orange-500"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Delivered Orders
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 gap-4">
        {activeTab === "pending" && (
          <>
            {userOrders
              .filter(order => order.status === "pending")
              .map((order) => (
                <Link to={`/fooddetailpage/${order._id}`}>

                  <div key={order._id} className="bg-white rounded-md shadow-md p-4">
                    <div className="mt-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 py-2">
                          <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            <p className="text-sm text-gray-500">Price: ${item.product.price * item.quantity}</p>
                          </div>
                        </div>

                      ))}
                    </div>
                    <p className="mt-4 text-right font-medium">Total: ${order.total}</p>
                  </div>
                </Link>
              ))}
          </>
        )}

        {activeTab === "shipped" && (
          <>
            {userOrders
              .filter(order => order.status === "shipped")
              .map((order) => (
                <div key={order._id} className="bg-white rounded-md shadow-md p-4">
                  {/* <h3 className="font-medium text-gray-900">Order ID: {order._id}</h3>
                <p className="text-sm text-gray-500">Status: {order.status}</p> */}
                  <div className="mt-4">
                    {order.items.map((item, index) => (
                      <Link to={`/fooddetailpage/${item.productId}`}>

                        <div key={index} className="flex items-center gap-4 py-2">
                          <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            <p className="text-sm text-gray-500">Price: ${item.product.price * item.quantity}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <p className="mt-4 text-right font-medium">Total: ${order.total}</p>
                </div>
              ))}
          </>
        )}

        {activeTab === "delivered" && (
          <>
            {userOrders
              .filter(order => order.status === "delivered")
              .map((order) => (
                <div key={order._id} className="bg-white rounded-md shadow-md p-4">

                  <div className="mt-4">
                    {order.items.map((item, index) => (
                      <Link to={`/fooddetailpage/${item.productId}`}>

                        <div key={index} className="flex items-center gap-4 py-2">
                          <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            <p className="text-sm text-gray-500">Price: ${item.product.price * item.quantity}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <p className="mt-4 text-right font-medium">Total: ${order.total}</p>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  )
}

export default UserOrders
