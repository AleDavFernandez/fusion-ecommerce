import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Alert, Box } from "@mui/material";
import { useUser } from "../contexts/UserContext";

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validar() {
    if (!email.includes("@")) return "Ingresá un email válido";
    if (password.length < 4) return "La contraseña debe tener al menos 4 caracteres";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault(); // evita que el form recargue la página
    const errorValidacion = validar();
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    try {
      setLoading(true);
      setError("");
      await login(email, password);
      navigate("/perfil"); // si el login sale bien, redirige
    } catch (err) {
      setError("Email o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Iniciar sesión
      </Typography>

      {/* Dato útil: la API de prueba acepta este usuario siempre */}
      <Alert severity="info" sx={{ mb: 2 }}>
        Podés probar con: john@mail.com / changeme
      </Alert>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <Alert severity="error">{error}</Alert>}

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
      </Box>
    </Container>
  );
}