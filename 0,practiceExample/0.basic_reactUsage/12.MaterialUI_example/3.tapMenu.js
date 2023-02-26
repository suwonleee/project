//https://codepen.io/suwonleee/pen/ZEjZwbb?editors=0010

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
  Tabs,
  Tab
} = MaterialUI;

function App() {
  const [tab1CurrentIndex, setTab1CurrentIndex] = useState(0);

  return (
    <>
      <Tabs value={tab1CurrentIndex} onChange={(_, newValue) => setTab1CurrentIndex(newValue)}>
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
      {/* //! 클릭했을 때 마다 탭이 바꾸게 하고 싶다면, == 인덱스가 N이라면 이 창을 보여줘! */}
      {tab1CurrentIndex == 0 && <div>내용1</div>}
      {tab1CurrentIndex == 1 && <div>내용2</div>}
      {tab1CurrentIndex == 2 && <div>내용3</div>}
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
