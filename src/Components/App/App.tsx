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
  const params: URLSearchParams = new URLSearchParams(window.location.search);

  const mode: string | null = params.get("mode");
  const FULLSCREEN_MODE: string = "fullscreen";
  const isFullScreen: boolean = mode === FULLSCREEN_MODE;

  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        {!isFullScreen && <Navbar />}
        <Map fullScreen={isFullScreen} />
      </StylesProvider>
    </MuiThemeProvider>
  );
};

export default App;
