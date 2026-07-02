import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getProductById } from "../services/productService";
import { useCart } from "../contexts/CartContext";
import { parseImage } from "../utils/parseImage";

export default function DetalleProducto() {
  const { id } = useParams(); // parámetro dinámico de la ruta /producto/:id
  const { agregarProducto } = useCart();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    async function fetchDetalle() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(id);
        setProducto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDetalle();
    // Se vuelve a pedir el producto cada vez que cambia el id en la URL
    // (por ejemplo si navegás de /producto/3 a /producto/7)
  }, [id]);

  function handleAgregar() {
    agregarProducto(producto, 1);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  }

  if (loading) return <Container sx={{ py: 4 }}><CircularProgress /></Container>;
  if (error) return <Container sx={{ py: 4 }}><Alert severity="error">{error}</Alert></Container>;
  if (!producto) return null;

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={parseImage(producto.images?.[0])}
            alt={producto.title}
            style={{ width: "100%", borderRadius: 8 }}
            onError={(e) => {
              e.target.src = "https://placehold.co/400x400?text=Sin+imagen";
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {producto.title}
          </Typography>

          <Chip label={producto.category?.name} sx={{ mb: 2 }} />

          <Typography variant="h5" color="primary" gutterBottom>
            ${producto.price}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {producto.description}
          </Typography>

          <Button variant="contained" size="large" onClick={handleAgregar}>
            Agregar al carrito
          </Button>

          {agregado && (
            <Alert severity="success" sx={{ mt: 2 }}>
              ¡Producto agregado al carrito!
            </Alert>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}