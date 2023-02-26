//백드롭은 그 상황이 되었을 때 다른 화면이 까매지면서, 화면 집중 되게 만들어주기
//https://codepen.io/suwonleee/pen/xxJBddW?editors=0010

const { useState } = React;

import classnames from "https://cdn.skypack.dev/classnames";

const {
  colors,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Link,
  Button,
  AppBar,
  Toolbar,
  Backdrop,
  CircularProgress
} = MaterialUI;

function App() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>안녕</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}
        >
        진행중이라는 
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

function Root() {
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
