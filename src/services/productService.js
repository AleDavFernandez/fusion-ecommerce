import { API_URL } from "./api";

// Trae productos, permite filtrar por título y por categoría, y paginar
export async function getProducts({ title, categoryId, offset, limit } = {}) {
  const params = new URLSearchParams();
  if (title) params.append("title", title);
  if (categoryId) params.append("categoryId", categoryId);
  if (offset !== undefined) params.append("offset", offset);
  if (limit !== undefined) params.append("limit", limit);

  const response = await fetch(`${API_URL}/products?${params.toString()}`);
  if (!response.ok) throw new Error("Error al obtener productos");
  return response.json();
}

// Trae el detalle de un producto puntual por id
export async function getProductById(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error("Producto no encontrado");
  return response.json();
}