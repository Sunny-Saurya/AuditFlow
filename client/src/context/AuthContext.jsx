import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || 'mock-token-for-scaffold-testing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We will verify the token on mount in Prompt 2
    if (token) {
      setUser({ email: 'placeholder@example.com' }); // placeholder for health check
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    // Will implement call to API in Prompt 2
    const fakeToken = 'placeholder-jwt-token';
    const fakeUser = { email };
    localStorage.setItem('token', fakeToken);
    setToken(fakeToken);
    setUser(fakeUser);
    return { success: true };
  };

  const signup = async (email, password) => {
    // Will implement call to API in Prompt 2
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
