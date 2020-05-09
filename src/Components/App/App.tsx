import React from "react";
import { createMuiTheme, MuiThemeProvider, StylesProvider } from "@material-ui/core/styles";
import { Navbar } from "../Navbar/Navbar";
import { Map } from "../Map/Map";
import "./App.scss";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000",
      light: "#FFF",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#FFF",
      light: "#FFF",
      dark: "#000",
      contrastText: "#000",
    },
    error: {
      main: "#B22222",
    },
  },
  typography: {
    fontFamily: "Rubik",
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <Navbar />
        <Map />
      </StylesProvider>
    </MuiThemeProvider>
  );
};

export default App;
