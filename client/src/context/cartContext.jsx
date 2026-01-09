import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../services/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  //cuando iniciemos la app el carrito se carga desde el backend
  const loadCart = async () => {
    try {
      const res = await fetch(`${API}/cart`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!Array.isArray(data)) {
        console.error("Respuesta inválida del carrito:", data);
        return;
      }
      setCart(data);
    } catch (error) {
      console.error("Error cargando carrito:", error);
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  //para actualizar carrito
  const addToCart = async (productId, quantity = 1) => {
    const res = await fetch(`${API}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id: productId, quantity }),
    });

    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error("Respuesta inválida del carrito:", data);
      return;
    }
    setCart(data);
  };

  //actualizar el quantity de un producto en un carrito
  const updateQuantity = async (productId, quantity) => {
    const res = await fetch(`${API}/cart/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ quantity }),
    });

    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error("Respuesta inválida del carrito:", data);
      return;
    }
    setCart(data);
  };

  //eliminar un producto que esté en un carrito
  const removeFromCart = async (productId) => {
    const res = await fetch(`${API}/cart/${productId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error("Respuesta inválida del carrito:", data);
      return;
    }
    setCart(data);
  };

  return (
    <CartContext.Provider
      value={{ cart, loadingCart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
