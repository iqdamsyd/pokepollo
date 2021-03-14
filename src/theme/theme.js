import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#2A304F",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#2A304F",
    },
    secondary: {
      main: "#F8BB16",
    },
    tertiary: {
      main: "#343D63",
    },
    text: {
      primary: "#F2F2F2",
      secondary: "#BDBDBD",
      disabled: "#444",
    },
  },
  typography: {
    fontFamily: "Lato",
    h1: {
      fontSize: "48px",
      fontWeight: "900",
    },
    h2: {
      fontSize: "38px",
      fontWeight: "900",
    },
    h3: {
      fontSize: "20px",
      fontWeight: "900",
    },
    body1: {
      fontSize: "16px",
      fontWeight: "600",
    },
    body2: {
      fontSize: "14px",
      fontWeight: "600",
    },
    button: {
      fontSize: "20px",
      fontWeight: "900",
      textTransform: "capitalize",
    },
  },
});

export default theme;
