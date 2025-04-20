import React, { useContext } from 'react';
import { AuthContext } from '../context/authcontext';
import { ShopContext } from '../context/shopcontext';

const AllOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = React.useState({});
    const {order,deleteOrder,updateOrderStatus} = useContext(ShopContext);

    return (
        <div className="max-w-6xl mx-auto p-4 py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">All Orders</h2>
            <div className="grid grid-cols-1 gap-4 mt-8">
                
                {Array.isArray(order) && [...order].reverse().map((order, index) => (
                    <div key={index} className="bg-white rounded-md shadow-md p-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-2">{order.user.name}</h2>
                        <div className="grid grid-cols-1 gap-2">
                            {order.items.map((item) => (
                                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-200 p-2 rounded-md">
                                            <img src={item.product.image} className="w-full h-full object-contain" alt={item.product.name} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">{item.product.name}</p>
                                            <p className="text-sm text-gray-600">Price: ${item.product.price}</p>
                                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <p className="text-lg font-bold text-gray-900">${item.product.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            {/* <p className="text-lg font-bold text-gray-900">Total: ${order.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}</p> */}
                            <p className="text-lg font-bold text-gray-900">Total: ${order.total}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">Status: {order.status}</p>
                    {/* <button onClick={() => deleteOrder(order._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Remove</button> */}
                    <div className="flex justify-end mt-4">
                        <button onClick={() => updateOrderStatus(order._id, 'delivered')} className={order.status==="pending"?"bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition":"bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"}>{order.status==="pending"?"Mark as Delivered":"Delivered"}</button>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllOrders;



