
import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    const role = Cookies.get('role'); 
    const id = Cookies.get('id');
    setIsAuthenticated(!!token); 
    setUserRole(role);
    setUser(id)
  }, []);

  const register = (token, role, _id) => {
    Cookies.set('token', token, { expires: 7 });
    Cookies.set('role', role, { expires: 7 }); 
    Cookies.set('id', _id , {expires : 7});
    setIsAuthenticated(true);
    setUserRole(role);
    setUser(_id)
  }

  const login = (token, role,_id) => {
    Cookies.set('token', token, { expires: 7 });
    Cookies.set('role', role, { expires: 7 }); 
    Cookies.set('id',_id,{ expires: 7 });
    setIsAuthenticated(true);
    setUserRole(role);
    setUser(_id)
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('id');
    setIsAuthenticated(false);
    setUserRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout, register,user}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

