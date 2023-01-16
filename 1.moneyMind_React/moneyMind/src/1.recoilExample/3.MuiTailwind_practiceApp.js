import React, {useState, useRef, useEffect } from "react";
// import ReactDOM from "react-dom/client";
import "./index.css";

import { Button, AppBar, Toolbar, TextField, Chip } from '@mui/material';

var classNames = require('classnames');
classNames('foo', 'bar'); // => 'foo bar'


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

    setTodos((todos) => [newTodo, ...todos]);
  };

  const modifyTodo = (index, newContent) => {
    const newTodos = todos.map((todo, _index) =>
      _index !== index ? todo : { ...todo, content: newContent }
    );
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, _index) => _index !== index);
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
  
  useEffect(() => {
    todosState.addTodo('운동\n스트레칭\n유산소\n상체\n하체\n볼륨 트레이닝');
    todosState.addTodo('명상');
    todosState.addTodo('공부');
  }, [todosState]);

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length === 0) {
      alert("할일을 입력해주세요.");
      form.content.focus();

      return;
    }

    todosState.addTodo(form.content.value);
    form.content.value = "";
    form.content.focus();
  };

  return (
<>
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
          minRows={3}
          maxRows={10}
          multiline
          autoComplete="off"
          name="content"
          label="할일을 입력해주세요."
          variant="outlined"
        />

        <Button type="submit" variant="contained">
          추가
        </Button>
      </form>
      <div className="mt-4 px-4">
        <ul>
          {todosState.todos.map((todo, index) => (
            <li key={todo.id} className="mt-10">
              <div className="flex gap-2">
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
              <div className="mt-4 shadow rounded-[20px] flex">
                <Button
                  className="flex-shrink-0 !items-start !rounded-[20px_0_0_20px]"
                  color="inherit"
                >
                  <span
                    className={classNames(
                      "text-4xl",
                      "h-[80px]",
                      "flex items-center",
                      {
                        "text-[color:var(--mui-color-primary-main)]":
                          index % 2 === 0
                      },
                      { "text-[#dcdcdc]": index % 2 !== 0 }
                    )}
                  >
                    <i className="fa-solid fa-check"></i>
                  </span>
                </Button>
                <div className="flex-shrink-0 my-5 w-[2px] bg-[#dcdcdc] mr-4"></div>
                <div className="whitespace-pre-wrap leading-relaxed hover:text-[color:var(--mui-color-primary-main)] flex-grow flex items-center my-5">
                  {todo.content}
                </div>
                <Button
                  className="flex-shrink-0 !items-start !rounded-[0_20px_20px_0]"
                  color="inherit"
                >
                  <span className="text-[#dcdcdc] text-2xl h-[80px] flex items-center">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default App;

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
