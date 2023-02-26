//버튼을 클릭하면 드로어(drawer)가 왼쪽에 나오게 
//https://codepen.io/suwonleee/pen/XWBGRzV?editors=0010

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
  Drawer,
  List,
  ListItem
} = MaterialUI;

function App() {
  //anchor라는 변수에 담아서 밑에 Drawer에서 사용.
  const anchor = "left";
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>안녕</Button>
      //! Drawer 코드 
      <Drawer anchor={anchor} open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItem button>사과</ListItem>
          <ListItem button>당근</ListItem>
          <ListItem button>딸기</ListItem>
        </List>
      </Drawer>
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
