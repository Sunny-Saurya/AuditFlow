import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || 'mock-token-for-scaffold-testing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (token) {
      setUser({ email: 'placeholder@example.com' }); 
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    
    const fakeToken = 'placeholder-jwt-token';
    const fakeUser = { email };
    localStorage.setItem('token', fakeToken);
    setToken(fakeToken);
    setUser(fakeUser);
    return { success: true };
  };

  const signup = async (email, password) => {
    
    const fakeToken = 'placeholder-jwt-token';
    const fakeUser = { email };
    localStorage.setItem('token', fakeToken);
    setToken(fakeToken);
    setUser(fakeUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
