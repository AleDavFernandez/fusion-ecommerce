import { API_URL } from "./api";

// Login: devuelve { access_token, refresh_token }
export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Credenciales inválidas");
  return response.json();
}

// Trae los datos del usuario logueado a partir del token
export async function getProfile(token) {
  const response = await fetch(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("No se pudo obtener el perfil");
  return response.json();
}

// Registro de un nuevo usuario
export async function registerUser({ name, email, password }) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
      avatar: "https://api.lorem.space/image/face", // la API lo pide obligatorio
      role: "customer",
    }),
  });
  if (!response.ok) throw new Error("Error al registrar usuario");
  return response.json();
}