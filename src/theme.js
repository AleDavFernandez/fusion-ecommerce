import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a1a1a", // negro suave, para navbar y botones principales
    },
    secondary: {
      main: "#e8603c", // coral cálido, para acentos y CTAs
    },
    background: {
      default: "#fafafa",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 10, // bordes más redondeados en botones, cards, inputs
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 }, // saca el "TODO MAYUSCULAS" default de MUI
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: "0 2px 12px rgba(0,0,0,0.08)" },
      },
    },
  },
});

export default theme;