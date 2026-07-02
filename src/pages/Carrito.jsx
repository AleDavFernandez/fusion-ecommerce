import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
  Alert,
  TextField,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { parseImage } from "../utils/parseImage";

export default function Carrito() {
  const { carrito, eliminarProducto, vaciarCarrito, actualizarCantidad, total } = useCart();

  if (carrito.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="info">
          Tu carrito está vacío. <Link to="/productos">Ir a productos</Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Carrito
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="center">Cantidad</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="center">Quitar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carrito.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <img
                    src={parseImage(item.images?.[0])}
                    alt={item.title}
                    style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
                  />
                  {item.title}
                </Box>
              </TableCell>
              <TableCell align="center">
                <TextField
                  type="number"
                  size="small"
                  value={item.cantidad}
                  onChange={(e) => actualizarCantidad(item.id, Number(e.target.value))}
                  sx={{ width: 70 }}
                  inputProps={{ min: 1 }}
                />
              </TableCell>
              <TableCell align="right">${item.price}</TableCell>
              <TableCell align="right">${(item.price * item.cantidad).toFixed(2)}</TableCell>
              <TableCell align="center">
                <IconButton color="error" onClick={() => eliminarProducto(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
        <Button variant="outlined" color="error" onClick={vaciarCarrito}>
          Vaciar carrito
        </Button>

        <Typography variant="h5">Total: ${total.toFixed(2)}</Typography>
      </Box>
    </Container>
  );
}