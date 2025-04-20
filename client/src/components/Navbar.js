import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authcontext'
import { ShopContext } from '../context/shopcontext';
const Navbar = () => {
  const { user, logout,token } = useContext(AuthContext);
  const {totalquantity} = useContext(ShopContext);
// console.log(user.id);

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <span className="text-2xl mr-2">🍽️</span>
                <span className="font-bold text-xl text-gray-900">FOOATO</span>
              </a>
            </div>

            {/* Navigation Links - Desktop */}
            {token?
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-600 hover:text-orange-500 transition">Home</a>
              <a href="/restruntent" className="text-gray-600 hover:text-orange-500 transition">Restaurants</a>
              <a href="/user-orders" className="text-gray-600 hover:text-orange-500 transition">Orders</a>
              <a href="/about" className="text-gray-600 hover:text-orange-500 transition">About</a>
            {user && (
              <Link to={`/cart/${user.id}`}>
                <div className='gap-1 flex'>
                <button className="text-gray-600  hover:text-orange-500 transition">Cart</button>
                <span className="text-sm text-white  bg-red-500 px-2 py-1 rounded-full">{totalquantity}</span>
                {/* <span>{totalquantity}</span> */}
                </div>
              </Link>
            )
            }
            </div>:<></>
}
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/login">
                {!user ?
                  <button className="hidden md:block text-gray-600 hover:text-orange-500 transition">
                    Sign In
                  </button> :
                  <button className="text-gray-600 hover:text-orange-500 transition" onClick={() => { logout() }}>
                    Logout
                  </button>
                }
              </Link>
              {
                user && user.role === 'admin' ?
                  <Link to="/admin-dashboard">
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                      Admin
                    </button>
                  </Link>
                  : <></>
              }

              {/* Mobile Menu Button */}
              <button className="md:hidden text-gray-600 hover:text-orange-500">
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 text-gray-600 hover:text-orange-500 transition">Home</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-orange-500 transition">Restaurants</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-orange-500 transition">Orders</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-orange-500 transition">About</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-orange-500 transition">Sign In</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
