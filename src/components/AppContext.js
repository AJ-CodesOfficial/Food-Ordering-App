"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(product) {
  let price = product.basePrice;

  if (product.size) {
    price += product.size.price;
  }

  if (product.extras?.length > 0) {
    for (const extra of product.extras) {
      price += extra.price;
    }
  }

  return price;
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveCartProductsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  function addToCart(product, size = null, extras = []) {
    setCartProducts((prev) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prev, cartProduct];

      saveCartProductsToLocalStorage(newProducts);

      return newProducts;
    });
  }

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeFromCart(index) {
    setCartProducts((prev) => {
      const newCartProducts = prev.filter((_, i) => i !== index);
      saveCartProductsToLocalStorage(newCartProducts);

      return newCartProducts;
    });

    toast.success("Item removed from cart 🎊");
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          clearCart,
          removeFromCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
