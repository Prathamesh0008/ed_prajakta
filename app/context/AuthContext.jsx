// app/context/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = () => {
      const storedUser = localStorage.getItem('edpharma_user');
      const token = localStorage.getItem('edpharma_token');
      
      if (storedUser && token) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing user data:', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (emailOrPhone, password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, create mock user data
      const mockUser = {
        id: 'user_' + Date.now(),
        firstName: 'John',
        lastName: 'Doe',
        email: emailOrPhone.includes('@') ? emailOrPhone : null,
        phone: !emailOrPhone.includes('@') ? emailOrPhone : '9876543210',
        createdAt: new Date().toISOString(),
      };

      // Store in localStorage
      localStorage.setItem('edpharma_user', JSON.stringify(mockUser));
      localStorage.setItem('edpharma_token', 'mock_jwt_token_' + Date.now());
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create user object
      const newUser = {
        id: 'user_' + Date.now(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        newsletter: userData.newsletter,
        createdAt: new Date().toISOString(),
        address: '',
        city: '',
        state: '',
        zipCode: '',
        dateOfBirth: ''
      };

      // Store in localStorage
      localStorage.setItem('edpharma_user', JSON.stringify(newUser));
      localStorage.setItem('edpharma_token', 'mock_jwt_token_' + Date.now());
      
      setUser(newUser);
      setIsAuthenticated(true);
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('edpharma_user');
    localStorage.removeItem('edpharma_token');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/auth/signin');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('edpharma_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // NEW FUNCTIONS FOR ORDER MANAGEMENT

  const addOrder = (orderData) => {
    try {
      // Get current user
      const storedUser = localStorage.getItem('edpharma_user');
      if (!storedUser) return { success: false, error: 'User not found' };

      const user = JSON.parse(storedUser);
      
      // Get existing orders or initialize empty array
      const existingOrders = JSON.parse(localStorage.getItem(`edpharma_orders_${user.id}`) || '[]');
      
      // Add new order with user ID
      const newOrder = {
        ...orderData,
        userId: user.id,
        createdAt: new Date().toISOString()
      };
      
      const updatedOrders = [newOrder, ...existingOrders];
      
      // Save to localStorage
      localStorage.setItem(`edpharma_orders_${user.id}`, JSON.stringify(updatedOrders));
      
      return { success: true, order: newOrder };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getUserOrders = () => {
    try {
      const storedUser = localStorage.getItem('edpharma_user');
      if (!storedUser) return [];

      const user = JSON.parse(storedUser);
      const orders = JSON.parse(localStorage.getItem(`edpharma_orders_${user.id}`) || '[]');
      
      return orders;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      return [];
    }
  };

  const getOrderById = (orderId) => {
    try {
      const storedUser = localStorage.getItem('edpharma_user');
      if (!storedUser) return null;

      const user = JSON.parse(storedUser);
      const orders = JSON.parse(localStorage.getItem(`edpharma_orders_${user.id}`) || '[]');
      
      return orders.find(order => order.id === orderId);
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        signup,
        logout,
        updateUser,
        addOrder,           // Add this
        getUserOrders,      // Add this
        getOrderById        // Add this
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}



