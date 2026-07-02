import { AppBar, Toolbar, Typography, Button, Box, Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../contexts/UserContext";

export default function Navbar() {
  const { carrito } = useCart();
  const { usuario, logout } = useUser();

  // Cantidad total de productos en el carrito (sumando cantidades, no solo items distintos)
  const cantidadCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / nombre de la tienda, siempre lleva al Home */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          Fusion
        </Typography>

        {/* Navegación principal */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button color="inherit" component={Link} to="/productos">
            Productos
          </Button>
          <Button color="inherit" component={Link} to="/contacto">
            Contacto
          </Button>

          {usuario ? (
            <>
              <Button color="inherit" component={Link} to="/perfil">
                Perfil
              </Button>
              <Button color="inherit" onClick={logout}>
                Salir
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/registro">
                Registrarme
              </Button>
            </>
          )}

          <IconButton color="inherit" component={Link} to="/carrito">
            <Badge badgeContent={cantidadCarrito} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}