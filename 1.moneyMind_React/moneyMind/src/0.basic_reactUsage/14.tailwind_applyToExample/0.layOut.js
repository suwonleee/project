//https://codepen.io/suwonleee/pen/eYjwmXw?editors=0010
// 테일윈드 추가하기
const { useState, useRef, useEffect } = React;

import classNames from "https://cdn.skypack.dev/classnames";

const {
  colors,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Link,
  Button,
  AppBar,
  Toolbar,
  TextField,
  Chip,
  Box
} = MaterialUI;

function useTodosState() {
  const [todos, setTodos] = useState([]);
  const lastTodoIdRef = useRef(0);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;

    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date())
    };
    // 새로 정보가 들어오면 맨 위에 추가해주기
    setTodos((todos) => [newTodo, ...todos]);
  };

    // ! 수정하는 기능
  const modifyTodo = (index, newContent) => {
        //수정하려면 map
    const newTodos = todos.map((todo, _index) =>
      _index != index ? todo : { ...todo, content: newContent }
    );
    setTodos(newTodos);
  };

    // ! 제거하는 기능
  const removeTodo = (index) => {
        //삭제하려면 filter 
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  };

  return {
    todos,
    addTodo,
    modifyTodo,
    removeTodo
  };
}

function App() {
  const todosState = useTodosState();

  //! 코드가 추가되어 들어온다면 여기에서 사용
  useEffect(() => {
    todosState.addTodo("운동\n스트레칭\n유산소\n상체\n하체볼륨 트레이닝");
    todosState.addTodo("명상");
    todosState.addTodo("공부");
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할일을 입력해주세요.");
      form.content.focus();

      return;
    }

    //addTodo로 들어온 값 추가해주기
    todosState.addTodo(form.content.value);

        //다시 폼 비우고, 포커스 맞춰주기
    form.content.value = "";
    form.content.focus();
  };

  return (
    <>
      {/* 앱바 */}
      <AppBar position="fixed">
        <Toolbar>
          <div className="flex-1"></div>
          <span className="font-bold">HAPPY NOTE</span>
          <div className="flex-1"></div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <form onSubmit={onSubmit} className="flex flex-col mt-4 px-4 gap-2">
        <TextField
          // 텍스트 필드를 멀티라인으로 지정해주기
          minRows={3}
          maxRows={10}
          multiline
          autoComplete="off"
          name="content"
          label="할일을 입력해주세요."
         // ! 네모박스를 따라 색상이 그려진다.
          variant="outlined"
        />

        <Button type="submit" variant="contained">
          추가
        </Button>
      </form>
      {/* //! 할일 리스트 담아줄 것 만들기 */}
      <div className="mt-4 px-4">
        <ul>
          {todosState.todos.map((todo) => (
            <li key={todo.id} className="mt-10">
              <div className="flex gap-2">
             {/* todo 리스트 번호랑, 작성 날짜 꾸미기 pt-1 은 padding top */}
                <Chip
                  label={`번호 : ${todo.id}`}
                  variant="outlined"
                  className="!pt-1"
                />
                <Chip
                  label={todo.regDate}
                  color="primary"
                  variant="outlined"
                  className="!pt-1"
                />
              </div>
              {/* todo 리스트 콘텐츠 꾸미기. */}
              {/* whitespace-pre-wrap leading-relaxed를 통해서 블락 내 엔터(enter, \n)기능 활성화 */}
              <div className="mt-4 shadow rounded-[20px] flex">
              확인 해보기
                <div className="bg-red-500 w-[150px] flex-shrink-0">전</div>
                {/* // ! bg(background 컬러를 지정해주어 어느 정도 영역을 포함하는지 확인해보기)
                여기에 이렇게 지정해주면 따로 박스 설정 없이 main 컬러를 지정해줄 수 있다. hover = 마우스 올렸을 때 색상 변하게 만들기 */}
                <div className="bg-blue-400 whitespace-pre-wrap leading-relaxed hover:text-[color:var(--mui-color-primary-main)] flex-grow">
                  {todo.content}
                  {/* 이렇게 박스를 지정해주고, 글씨 색상까지 바꿀 수 있다. */}
                {/* <Box component="span" sx={{color:'primary.main'}}> */}
                  {/* {todo.content}
                </Box> */}
                </div>
                <div className="bg-red-300 w-[150px] flex-shrink-0">후후</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

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
  "warning"
];

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
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

// 유틸리티

// 날짜 객체 입력받아서 문장(yyyy-mm-dd hh:mm:ss)으로 반환한다.
function dateToStr(d) {
  const pad = (n) => {
    return n < 10 ? "0" + n : n;
  };

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds())
  );
}
