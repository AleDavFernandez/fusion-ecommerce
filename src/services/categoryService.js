import { API_URL } from "./api";

export async function getCategories() {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) throw new Error("Error al obtener categorías");
  return response.json();
}