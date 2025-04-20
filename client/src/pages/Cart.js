import React, { useContext } from 'react';
import { AuthContext } from '../context/authcontext';
import { ShopContext } from '../context/shopcontext';
import OIP from '../assets/OIP.jpeg'
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate=useNavigate();
    const { cart, removecartitem, subtotal,increaseQuantity,decreaseQuantity,placeOrder } = useContext(ShopContext);
    const { user } = useContext(AuthContext);
    const [orderPlaced, setOrderPlaced] = React.useState(false);
    const ship=5;
    const tax=2;
    const grandtotal=subtotal+ship+tax;
    // const [cart, setCart] = React.useState({});
    // console.log(user.id);

    // React.useEffect(() => {
    //     const fetchCart = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:5000/api/cart/${user.id}`);
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch cart');
    //             }
    //             const data = await response.json();
    //             setCart(data);
    //             console.log(data);

    //         } catch (error) {
    //             console.error('Error fetching cart:', error);
    //         }
    //     };

    //     fetchCart();
    // }, []);
    return (
        <>

            {orderPlaced && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully</h2>
                        <button onClick={() => setOrderPlaced(false)} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                            Close
                        </button>
                    </div>
                </div>
            )}


            <div class="font-sans max-w-5xl max-md:max-w-xl mx-auto bg-white py-4">
                <h1 class="text-3xl font-bold text-gray-800 text-center">Shopping Cart</h1>

                <div class="grid md:grid-cols-3 gap-8 mt-16">
                    <div class="md:col-span-2 space-y-4">

                        {Array.isArray(cart.items) && cart.items.map((i) => (
                            <>
                                <div class="grid grid-cols-3 items-start gap-4">
                                    <div class="col-span-2 flex items-start gap-4">
                                        <div class="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
                                            <img src={i.product.image} class="w-full h-full object-contain" />
                                            {/* <img src={i.product.image} class="w-full h-full object-contain" /> */}
                                        </div>

                                        <div class="flex flex-col">
                                            <h3 class="text-base font-bold text-gray-800">{i.product.name}</h3>
                                            {/* <p class="text-xs font-semibold text-gray-500 mt-0.5">Size: MD</p> */}

                                            <button onClick={() => removecartitem(i._id)}  type="button" class="mt-6 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 fill-current inline" viewBox="0 0 24 24">
                                                    <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"></path>
                                                    <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000"></path>
                                                </svg>
                                                REMOVE
                                            </button>
                                            <button onClick={() => navigate(`/fooddetailpage/${i.productId}`)} type="button" class="mt-2 font-semibold text-blue-500 text-xs flex items-center gap-1 shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 fill-current inline" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                                                    <path d="M11 11h2v6h-2zm0-4h2v2h-2z"/>
                                                </svg>
                                                VIEW DETAILS
                                            </button>
                                        </div>
                                    </div>

                                    <div class="ml-auto">
                                        <h4 class="text-lg max-sm:text-base font-bold text-gray-800">${i.product.price}</h4>

                                        <button type="button"
                                            class="mt-6 flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                                            <svg onClick={()=>decreaseQuantity(i._id)} xmlns="http://www.w3.org/2000/svg" class="w-2.5 fill-current" viewBox="0 0 124 124">
                                                <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                                            </svg>

                                            <span class="mx-3 font-bold">{i.quantity}</span>
                                            <svg onClick={()=>increaseQuantity(i._id)} xmlns="http://www.w3.org/2000/svg" class="w-2.5 fill-current" viewBox="0 0 42 42">
                                                <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <hr class="border-gray-300" />
                            </>
                        ))}
                    </div>


                   {Array.isArray(cart.items) && cart.items.length > 0 ? (
                    <div class="bg-gray-100 rounded-md p-4 h-max">
                    <h3 class="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">Order Summary</h3>

                    <ul class="text-gray-800 mt-6 space-y-3">
                        <li class="flex flex-wrap gap-4 text-sm">Subtotal <span class="ml-auto font-bold">${subtotal}.00</span></li>
                        <li class="flex flex-wrap gap-4 text-sm">Shipping <span class="ml-auto font-bold">${ship}.00</span></li>
                        <li class="flex flex-wrap gap-4 text-sm">Tax <span class="ml-auto font-bold">${tax}.00</span></li>
                        <hr class="border-gray-300" />
                        <li class="flex flex-wrap gap-4 text-sm font-bold">Total <span class="ml-auto">${grandtotal}.00</span></li>
                    </ul>

                    <div class="mt-6 space-y-3">
                        <button type="button" class="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md" onClick={()=>placeOrder() && setOrderPlaced(true)}>Checkout</button>
                        <Link to='/'><button type="button" class="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md">Continue Shopping  </button></Link>
                    </div>
                </div>
                ) : (
                    <div className="text-center py-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Your cart is empty</h3>
                        <p className="text-gray-600 mb-6">Add some delicious items to your cart and come back!</p>
                        <Link to="/">
                            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
                                Browse Menu
                            </button>
                        </Link>
                    </div>
                )}
                </div>
            </div>
        </>
    );
};

export default Cart;

