//할일추가 폼 꾸미기
//https://codepen.io/suwonleee/pen/gOjJGbz?editors=0010

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
  Chip
} = MaterialUI;

function useTodosState() {
  const [todos, setTodos] = useState([]);
  const lastTodoIdRef = useRef(0);

  // ! 더하는 기능
  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;

    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date())
    };

    // 새로 정보가 들어오면 추가해주고 다음으로 넘겨주기
    setTodos((todos) => [...todos, newTodo]);
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
    todosState.addTodo('운동');
    todosState.addTodo('명상');
    todosState.addTodo('공부');
  }, [])
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
          autoComplete="off"
          name="content"
          label="할일을 입력해주세요."
          // ! 네모박스를 따라 색상이 그려진다.
          variant="outlined"
        />

        <Button variant="contained">추가</Button>
      </form>
      {/* //! 할일 리스트 담아줄 것 만들기 */}
      <div className="mt-4 px-4">
        <ul>
          {todosState.todos.map((todo) => (
            <li key={todo.id} className="mt-10">
              <div className="flex gap-2">
                <Chip label={`번호 : ${todo.id}`} variant="outlined" />
                <Chip label={todo.regDate} color="primary" variant="outlined"/>
              </div>
              <div>
                {todo.content}
              </div>
            </li>
          ))}
        </ul>
      </div>
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
        main: "#0686",
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
