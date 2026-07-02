import { useState } from "react";
import { Container, Typography, Button, Grid, Box, CircularProgress, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

export default function Home() {
  // Se calcula una sola vez al montar el componente (no en cada render),
  // gracias a pasarle una función a useState en vez de un valor directo
  const [offset] = useState(() => Math.floor(Math.random() * 40));

  const { products, loading, error } = useProducts({ offset, limit: 8 });

  return (
    <>
      {/* Header / bienvenida */}
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 8, textAlign: "center" }}>
        <Container>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Fusion
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Todo lo que buscás, en un solo lugar
          </Typography>
          <Button
            component={Link}
            to="/productos"
            variant="contained"
            color="secondary"
            size="large"
          >
            Ver productos
          </Button>
        </Container>
      </Box>

      {/* Sección destacada */}
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" gutterBottom>
          Productos destacados
        </Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={3}>
          {products.map((producto) => (
            <Grid item xs={12} sm={6} md={3} key={producto.id}>
              <ProductCard producto={producto} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}