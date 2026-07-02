import { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import ProductCard from "../components/ProductCard";

export default function Productos() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  const { categories } = useCategories();

  // El hook se vuelve a ejecutar solo cuando cambian busqueda o categoriaId,
  // porque así lo definimos en las dependencias de su useEffect interno
  const { products, loading, error } = useProducts({
    title: busqueda,
    categoryId: categoriaId || undefined,
  });

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Productos
      </Typography>

      {/* Buscador y filtro */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Buscar por nombre"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Categoría"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
          >
            <MenuItem value="">Todas</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* Estados de carga / error */}
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && products.length === 0 && (
        <Alert severity="info">No se encontraron productos.</Alert>
      )}

      {/* Grid de productos */}
      <Grid container spacing={3}>
        {products.map((producto) => (
          <Grid item xs={12} sm={6} md={3} key={producto.id}>
            <ProductCard producto={producto} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}