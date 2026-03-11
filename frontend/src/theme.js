import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C53030",
      light: "#E53E3E",
      dark: "#6E1B24",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#8A2430",
    },

    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
    },

    success: {
      main: "#2A9D8F",
    },

    warning: {
      main: "#F4A261",
    },

    error: {
      main: "#C1121F",
    },

    info: {
      main: "#3B82F6",
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: "Inter, sans-serif",

    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },

    body1: {
      fontSize: "16px",
    },
  },
});

export default theme;