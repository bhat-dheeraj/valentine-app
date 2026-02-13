import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff4d6d",
    },
    background: {
      default: "#3f3f3f",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  shape: {
    borderRadius: 18,
  },
});

export default theme;
