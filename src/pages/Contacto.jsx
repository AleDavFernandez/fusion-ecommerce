import { useState } from "react";
import { Container, TextField, Button, Typography, Alert, Box } from "@mui/material";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.asunto || !form.mensaje) {
      setError("Completá todos los campos");
      return;
    }

    setError("");
    // No hay backend para contacto, así que simulamos el envío
    setEnviado(true);
    setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Contacto
      </Typography>

      {enviado && (
        <Alert severity="success" sx={{ mb: 2 }}>
          ¡Mensaje enviado con éxito! Te responderemos a la brevedad.
        </Alert>
      )}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} />
        <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <TextField label="Asunto" name="asunto" value={form.asunto} onChange={handleChange} />
        <TextField
          label="Mensaje"
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          multiline
          rows={4}
        />

        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </Box>
    </Container>
  );
}