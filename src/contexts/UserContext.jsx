import { createContext, useContext, useState } from "react";
import { loginUser, registerUser, getProfile } from "../services/userService";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  async function login(email, password) {
    const data = await loginUser(email, password);
    setToken(data.access_token);

    // Con el token, pedimos los datos reales del usuario (incluye name)
    const perfil = await getProfile(data.access_token);
    setUsuario(perfil);

    return data;
  }

  function logout() {
    setUsuario(null);
    setToken(null);
  }

  async function registro(datos) {
    const nuevoUsuario = await registerUser(datos);
    return nuevoUsuario;
  }

  const value = { usuario, token, login, logout, registro };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}