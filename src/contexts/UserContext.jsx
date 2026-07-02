import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, getProfile } from "../services/userService";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);

  // Al montar la app, si hay un token guardado de una sesión anterior,
  // recuperamos el perfil automáticamente para no perder la sesión al refrescar
  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token");

    if (tokenGuardado) {
      getProfile(tokenGuardado)
        .then((perfil) => {
          setToken(tokenGuardado);
          setUsuario(perfil);
        })
        .catch(() => {
          // El token guardado ya no es válido (expiró, etc.)
          localStorage.removeItem("token");
        })
        .finally(() => setCargandoSesion(false));
    } else {
      setCargandoSesion(false);
    }
  }, []); // se ejecuta una sola vez, al montar

  async function login(email, password) {
    const data = await loginUser(email, password);
    setToken(data.access_token);
    localStorage.setItem("token", data.access_token); // persistimos el token

    const perfil = await getProfile(data.access_token);
    setUsuario(perfil);

    return data;
  }

  function logout() {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem("token"); // limpiamos la sesión guardada
  }

  async function registro(datos) {
    const nuevoUsuario = await registerUser(datos);
    return nuevoUsuario;
  }

  const value = { usuario, token, login, logout, registro, cargandoSesion };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}