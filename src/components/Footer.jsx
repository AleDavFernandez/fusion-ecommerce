import { Box, Container, Typography, Link as MuiLink } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "grey.900", color: "white", py: 4, mt: 6 }}>
      <Container>
        <Typography variant="h6">Fusion</Typography>
        <Typography variant="body2">Email: contacto@fusion.com</Typography>
        <Typography variant="body2">Teléfono: +54 11 1234-5678</Typography>
        <Typography variant="body2">Dirección: Av. Siempreviva 742, Posadas, Misiones</Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <MuiLink href="#" color="inherit">Instagram</MuiLink>
          <MuiLink href="#" color="inherit">Facebook</MuiLink>
          <MuiLink href="#" color="inherit">Twitter</MuiLink>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          © {new Date().getFullYear()} Fusion. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}