import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './authcontext';

const ShopContext = createContext();

const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalquantity, settotalquantity] = useState(0)
    const [subtotal, setsubtotal] = useState(0)
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = React.useState([]);
    const [order, setorder] = useState([])
    
    React.useEffect(() => {
        const fetchFoods = async (productId) => {
            try {
                const response = await fetch('http://localhost:5000/foods/getfoods');
                if (!response.ok) {
                    throw new Error('Failed to fetch foods');
                }
                const data = await response.json();

                setFoods(data);
                // console.log(data);

            } catch (error) {
                console.error('Error fetching foods:', error);
            }
        };

        fetchFoods();
    }, []);

    const addToCart = async (productId, productName, productImage, productPrice) => {
        try {
            const response = await fetch('http://localhost:5000/api/cart/addtocart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id, user: { name: user.name, email: user.email }, productId: productId,
                    product: {
                        name: productName,
                        image: productImage,
                        price: productPrice,
                    },
                    quantity: 1,
                }),
                // body: JSON.stringify({ userId: user.id, products: [{ productId: productId, quantity: 1, product: { name: '', image: '', price: 0 } }] }),
            });
            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }
            const data = await response.json();
            console.log('Product added to cart:', data);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
        fetchCart();
        // fetchFoods(productId);
    };

    const fetchCart = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/${user.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch cart');
            }
            const data = await response.json();
            const tq = data.items.reduce((acc, item) => acc + item.quantity, 0);
            settotalquantity(tq);
            const st = data.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
            setsubtotal(st);
            // console.log(st);

            setCart(data);
            // console.log(data);

        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };
    useEffect(() => {
        fetchCart();
        fetchOrders();
    }, [user])


    const removecartitem = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/${user.id}/remove/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }
            const data = await response.json();
            console.log('Item removed from cart:', data);
            // Update the cart state
            setCart(data);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
        fetchCart();
    };

 

    const placeOrder = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders/placeorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    user,
                    items: cart.items,
                    address: "N/A",
                    total: subtotal,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to place order');
            }
            const data = await response.json();
            console.log('Order placed successfully:', data);
            // Clear the cart after successful order placement
            setCart({ items: [] });
            fetchCart();
        } catch (error) {
            console.error('Error placing order:', error);
        }
        fetchOrders();
    };

    const deleteOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/deleteorder/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete order');
            }
            const data = await response.json();
            console.log('Order deleted successfully:', data);
            // Update the order state after successful deletion
            setorder(data);
        } catch (error) {
            console.error('Error deleting order:', error);
        }
        fetchOrders();
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/updateorderstatus/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
            if (!response.ok) {
                throw new Error('Failed to update order status');
            }
            const data = await response.json();
            console.log('Order status updated successfully:', data);
            // Update the order state after successful status update
            setorder(data);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
        fetchOrders();
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders/getorders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            // console.log('Orders fetched successfully:', data);
            setorder(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const increaseQuantity = async (itemId) => {
        try {
            const updatedItems = cart.items.map(item => {
                if (item._id === itemId) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            
            // const response = await fetch(`http://localhost:5000/api/cart/${cart.userId}/items/${itemId}/increase`, {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // });
            
            // if (!response.ok) {
            //     throw new Error('Failed to increase quantity');
            // }
            
            const updatedCart = { ...cart, items: updatedItems };
            setCart(updatedCart);
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

    const decreaseQuantity = async (itemId) => {
        try {
            // const item = cart.items.find(item => item._id === itemId);
            // if (item.quantity <= 1) {
            //     return; // Don't decrease below 1
            // }

            const updatedItems = cart.items.map(item => {
                if (item._id === itemId) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });

            // const response = await fetch(`http://localhost:5000/api/cart/${cart.userId}/items/${itemId}/decrease`, {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to decrease quantity');
            // }

            const updatedCart = { ...cart, items: updatedItems };
            setCart(updatedCart);
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        }
    };

    return (
        <ShopContext.Provider value={{ cart, addToCart, totalquantity, foods,setFoods, removecartitem, subtotal, placeOrder, order,deleteOrder,updateOrderStatus,increaseQuantity }}>
            {children}
        </ShopContext.Provider>
    );
};

export { ShopProvider, ShopContext };

