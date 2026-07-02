import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Alert, Box } from "@mui/material";
import { useUser } from "../contexts/UserContext";

export default function Registro() {
  const { registro } = useUser();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validar() {
    if (!nombre.trim()) return "Ingresá tu nombre";
    if (!email.includes("@")) return "Ingresá un email válido";
    if (password.length < 4) return "La contraseña debe tener al menos 4 caracteres";
    if (password !== confirmPassword) return "Las contraseñas no coinciden";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errorValidacion = validar();
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    try {
      setLoading(true);
      setError("");
      await registro({ name: nombre, email, password });
      navigate("/login"); // tras registrarse, lo mandamos a loguearse
    } catch (err) {
      setError("No se pudo registrar. Probá con otro email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Crear cuenta
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <TextField
          label="Confirmar contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <Alert severity="error">{error}</Alert>}

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Registrando..." : "Registrarme"}
        </Button>
      </Box>
    </Container>
  );
}