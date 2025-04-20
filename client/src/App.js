import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FoodAddadmin from './pages/FoodAddadmin'
import Fooddetailpage from './pages/Fooddetailpage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { AuthProvider } from './context/authcontext'
import ProtectRoute from './context/ProtectRoute'
import AdminDashboard from './pages/AdminDashboard'
import AllUsers from './pages/AllUsers'
import AllOrders from './pages/AllOrders'
import Cart from './pages/Cart'
import { ShopProvider } from './context/shopcontext'
import Restrauntent from './pages/Restrauntent'
import About from './pages/About'
import UserOrders from './pages/UserOrders'
import PaymentForm from './context/PaymentForm'
import CategoryFood from './pages/CategoryFood'
const App = () => {
  return (
    <AuthProvider>
      <ShopProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProtectRoute ><Home /></ProtectRoute>} />
            <Route path="/foodaddadmin" element={<ProtectRoute role="admin"><FoodAddadmin /></ProtectRoute>} />
            <Route path="/fooddetailpage/:id" element={<ProtectRoute ><Fooddetailpage /></ProtectRoute>} />
            <Route path="/admin-dashboard" element={<ProtectRoute role="admin"><AdminDashboard /></ProtectRoute>} />
            <Route path="/all-users" element={<ProtectRoute role="admin"><AllUsers /></ProtectRoute>} />
            <Route path="/all-orders" element={<ProtectRoute role="admin"><AllOrders /></ProtectRoute>} />
            <Route path="/cart/:id" element={<ProtectRoute ><Cart /></ProtectRoute>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/restruntent" element={<ProtectRoute ><Restrauntent /></ProtectRoute>} />
            <Route path="/about" element={<ProtectRoute ><About /></ProtectRoute>} />
            <Route path="/user-orders" element={<ProtectRoute ><UserOrders /></ProtectRoute>} />
            <Route path="/category/:name" element={<ProtectRoute ><CategoryFood /></ProtectRoute>} />
            <Route path="/pay" element={<ProtectRoute><PaymentForm /></ProtectRoute>} />
          </Routes>
          <Footer />
        </Router>
      </ShopProvider>
    </AuthProvider>

  )
}

export default App
