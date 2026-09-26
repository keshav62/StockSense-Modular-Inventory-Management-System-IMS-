import { createContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../services/authApi';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('stocksense_token'));
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token && !!user;

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('stocksense_token');
      if (storedToken) {
        try {
          const res = await authApi.getProfile();
          setUser(res.data.data);
          setToken(storedToken);
        } catch {
          // Token invalid — clear
          localStorage.removeItem('stocksense_token');
          localStorage.removeItem('stocksense_user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = useCallback(async (credentials) => {
    const res = await authApi.login(credentials);
    const { user: userData, token: authToken } = res.data.data;
    localStorage.setItem('stocksense_token', authToken);
    localStorage.setItem('stocksense_user', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
    return res.data;
  }, []);

  const signup = useCallback(async (data) => {
    const res = await authApi.signup(data);
    const { user: userData, token: authToken } = res.data.data;
    localStorage.setItem('stocksense_token', authToken);
    localStorage.setItem('stocksense_user', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
    return res.data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore — clear client state regardless
    }
    localStorage.removeItem('stocksense_token');
    localStorage.removeItem('stocksense_user');
    setToken(null);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const res = await authApi.getProfile();
      setUser(res.data.data);
    } catch {
      // Ignore
    }
  }, []);

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
