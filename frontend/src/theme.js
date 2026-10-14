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
      white: "#ffffff",
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

    // buttons keep the case we write, instead of MUI's default uppercase
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  // default look of MUI components, defined once for the whole app
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },

    MuiCard: {
      styleOverrides: {
        root: { boxShadow: "0 10px 30px rgba(0,0,0,0.18)" },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 16 },
      },
    },

    MuiTextField: {
      defaultProps: { size: "small" },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: "#1F2937", fontSize: 13, borderRadius: 8 },
      },
    },
  },
});

export default theme;
