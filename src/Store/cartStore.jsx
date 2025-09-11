import { useState, useEffect } from "react";
import UserContent from "./userStore";
import { CartContext } from "../component/Cart/CartContext"; 

const CartProvider = ({ children }) => {
  // read cart from localStorage on first render (safe parse)
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn("Failed to parse cart from localStorage:", e);
      return [];
    }
  });

  // write cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Failed to save cart to localStorage:", e);
    }
  }, [cart]);

  // Add to cart
  const addToCart = (newItems) => {
    setCart((prev) => [...prev, newItems]);
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Remove Item from Cart
  const removeItem = (itemID) => {
    const updatedCart = cart.filter((items) => {
      return items.id !== itemID;
    });
    setCart(updatedCart);
  };

  // Update the Cart
  const updateCart = (itemsID, newQuantity) => {
    const updateCartItems = cart.map((items) => {
      if (items.id === itemsID) {
        return { ...items, quantity: newQuantity };
      }
      return items;
    });
    setCart(updateCartItems);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, clearCart, removeItem, updateCart }}
    >
      <UserContent.Provider value={{ name: "Sam" }}>
        {children}
      </UserContent.Provider>
    </CartContext.Provider>
  );
};

export default CartProvider;

