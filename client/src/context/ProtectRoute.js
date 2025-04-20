import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './authcontext';
import { Link } from 'react-router-dom';
import Login from '../pages/Login';



const ProtectRoute = ({ children, role }) => {
  const { user, token, auth } = useContext(AuthContext);

  // console.log("Token:", token, "User:", user, "Auth:", auth);

  // // If the context is still initializing
  // if (token === null && auth === false) {
  //   // return <div><Link to={'/login'}>sign in</Link></div>; // Replace with a spinner or loading animation
  //   return <div><Login/></div>;

  // }

  // // If the user role doesn't match
  // if (token && user?.role !== role) {
  //   return <Navigate to="/login" replace />;
  // }

  // // If no token is present
  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }
  // //
  // const userRole = user?.role; // Assume user object has a 'role' property

  //   if (!user) {
  //       // If no user, redirect to login
  //       return <Navigate to="/login" />;
  //   }

  //   if (role && !role.includes(userRole)) {
  //       // If user's role is not in allowed roles, redirect to unauthorized page
  //       return <Navigate to="/login" />;
  //   }
  // //


  //
  const isAuthenticated = localStorage.getItem('token'); // Check if user is logged in
  const userrole = JSON.parse(localStorage.getItem('user')); // Fetch user role ('user' or 'admin')
  // console.log(userrole.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if the role matches 'user' or 'admin'
  if (role && role !== userrole.role) {
    return <Navigate to="/unauthorized" replace />;
  }
  //

  return children;
};

export default ProtectRoute;
