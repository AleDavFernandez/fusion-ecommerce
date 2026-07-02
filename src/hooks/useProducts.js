import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";

// Hook reutilizable para traer productos, con filtros opcionales
export function useProducts({ title, categoryId, offset, limit } = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función async adentro del useEffect (el callback de useEffect no puede ser async directamente)
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts({ title, categoryId, offset, limit });
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
    // Se vuelve a ejecutar cada vez que cambia un filtro
  }, [title, categoryId, offset, limit]);

  return { products, loading, error };
}