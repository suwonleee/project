import React from "react";
import ReactDOM from "react-dom/client";
// import { RecoilRoot } from "recoil";
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import "./index.css";
import Root from "./Root";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// const root = ReactDOM.createRoot(document.getElementById("root"));
const rootElement = 
ReactDOM.createRoot(document.getElementById('root'));
const root = 
createRoot(rootElement);

function Roots() {
  // Create a theme instance.
  const theme = createTheme({
    typography: {
      fontFamily: ["GmarketSansMedium"]
    },
    palette: {
      primary: {
        main: "#ff8686",
        contrastText: "#ffffff"
      }
    }
  });
  return (
    root.render(
      <StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Root />
        </ThemeProvider>
      </StrictMode>,
    )
  );
}

// ReactDOM.render(<Root />, document.getElementById("root"));
