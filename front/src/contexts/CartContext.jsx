/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("angatu_cart");
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error("Dados dos carrinho corrompidos. Resetando...", error);
      localStorage.removeItem("angatu_cart");
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("angatu_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((carrinhoAtual) => {
      const produtoExiste = carrinhoAtual.find(
        (item) => item.id === product.id,
      );

      if (produtoExiste) {
        return carrinhoAtual.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      return [...carrinhoAtual, { ...product, quantidade: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((carrinhoAtual) => {
      return carrinhoAtual.filter((item) => item.id != productId);
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
