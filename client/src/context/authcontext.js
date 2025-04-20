import { createContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [auth, setAuth] = useState(false)

//   const login = (userData, token) => {
//     setUser(userData);
//     setToken(token);
//   };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
setAuth(true);
// console.log(storedToken);

    }
  }, []);



  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    setAuth(false);
    // Navigate('/login')
  };

  return (
    <AuthContext.Provider value={{ user, token, logout, auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

