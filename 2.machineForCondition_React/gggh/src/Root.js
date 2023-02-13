import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";

const muiThemePaletteKeys = [
  "background",
  "common",
  "error",
  "grey",
  "info",
  "primary",
  "secondary",
  "success",
  "text",
  "warning",
];

function Root() {
  const theme = createTheme({
    typography: {
      fontFamily: ["GmarketSansMedium"],
    },
    components : {
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            //앱바 배경 색상
            backgroundColor: "#fff",
            //앱바 텍스트 색상
            color: "#0d0d0d"
          }
        }
      }
    },
    // 앱 테마
    palette: {
      primary: {
        main: "#3C35F2",
        contrastText: "#F2F2F2",
      },
    },
  });

  useEffect(() => {
    const r = document.querySelector(":root");

    muiThemePaletteKeys.forEach((paletteKey) => {
      const themeColorObj = theme.palette[paletteKey];

      for (const key in themeColorObj) {
        if (Object.hasOwnProperty.call(themeColorObj, key)) {
          const colorVal = themeColorObj[key];
          r.style.setProperty(`--mui-color-${paletteKey}-${key}`, colorVal);
        }
      }
    });
  }, [theme.palette]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <RecoilRoot>
          <HashRouter>
            <App />
          </HashRouter>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default Root;