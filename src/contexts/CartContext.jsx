import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  // Si el producto ya está en el carrito, suma cantidad. Si no, lo agrega.
  function agregarProducto(producto, cantidad = 1) {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  }

  function eliminarProducto(id) {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }
  
  function actualizarCantidad(id, cantidad) {
  if (cantidad < 1) return; // no dejamos bajar de 1, para eso está "eliminar"
  setCarrito((prev) =>
    prev.map((item) => (item.id === id ? { ...item, cantidad } : item)));
  }

  // Se recalcula en cada render, no hace falta guardarlo en estado aparte
  const total = carrito.reduce(
    (acc, item) => acc + item.price * item.cantidad,
    0
  );

  const value = {
  carrito,
  agregarProducto,
  eliminarProducto,
  vaciarCarrito,
  actualizarCantidad,
  total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook para consumir el contexto sin importar useContext + CartContext en cada componente
export function useCart() {
  return useContext(CartContext);
}