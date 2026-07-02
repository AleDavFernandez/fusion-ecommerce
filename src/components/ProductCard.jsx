import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { parseImage } from "../utils/parseImage";

export default function ProductCard({ producto }) {
  const imagen = parseImage(producto.images?.[0]);

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia
        component="img"
        image={imagen}
        alt={producto.title}
        sx={{
            aspectRatio: "1 / 1", // cuadrado perfecto, siempre igual sin importar la foto
            objectFit: "cover",
            width: "100%",
        }}
        onError={(e) => {
            e.target.src = "https://placehold.co/400x400?text=Sin+imagen";
        }}
        />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
          {producto.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${producto.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          to={`/producto/${producto.id}`}
          size="small"
          variant="contained"
          fullWidth
        >
          Ver detalle
        </Button>
      </CardActions>
    </Card>
  );
}