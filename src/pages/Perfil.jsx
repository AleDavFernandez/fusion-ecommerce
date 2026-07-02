import { Container, Typography, Alert, Paper, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";

export default function Perfil() {
  const { usuario } = useUser();
  const { carrito } = useCart();

  // Si no hay usuario logueado, mostramos el mensaje correspondiente y cortamos acá
  if (!usuario) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="warning">
          No hay ningún usuario logueado.{" "}
          <Link to="/login">Iniciá sesión</Link> para ver tu perfil.
        </Alert>
      </Container>
    );
  }

  const cantidadProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mi perfil
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Nombre
          </Typography>
          <Typography variant="body1">{usuario.name}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Email
          </Typography>
          <Typography variant="body1">{usuario.email}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Productos en el carrito
          </Typography>
          <Typography variant="body1">{cantidadProductos}</Typography>
        </Box>

        <Button component={Link} to="/carrito" variant="outlined">
          Ver carrito
        </Button>
      </Paper>
    </Container>
  );
}