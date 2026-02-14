//app\context\CartContext.jsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
  setCartItems(prev => {
    const existingItem = prev.find(item => item.id === product.id);

    if (existingItem) {
      return prev.map(item =>
        item.id === product.id
          ? { ...item, qty: item.qty + product.qty }
          : item
      );
    }

    return [...prev, { ...product, qty: product.qty }];
  });
};


  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQty = (productId, qty) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}





