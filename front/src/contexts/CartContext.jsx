/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
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
    if (!isAuthenticated) {
      toast.error("Faça login para adicionar um produto ao carrinho!");
      return navigate("/login");
    }

    setCart((carrinhoAtual) => {
      const produtoExiste = carrinhoAtual.find(
        (item) => item.id === product.id,
      );

      if (produtoExiste) {
        return carrinhoAtual.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...carrinhoAtual, { ...product, quantity: 1 }];
    });

    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const removeFromCart = (productId) => {
    setCart((carrinhoAtual) => {
      return carrinhoAtual.filter((item) => item.id != productId);
    });
    toast.success("Produto removido com sucesso!");
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
