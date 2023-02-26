//https://codepen.io/suwonleee/pen/XWByJXa?editors=0010

import React, { useState, useRef } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

function App() {
  const [todos, setTodos] = useState([]);
  const lastTodoIdRef = useRef(0);

  const addTodo = (newContent) => {
    //추가를 할 때마다 현재 + 1 되어 값이 나오도록
    const id = ++lastTodoIdRef.current;
    
    const newTodo = {
      id,
      content: newContent,
      list: "pineapple",
      regDate: "2022-04-19 12:12:12"
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };
  
  // ! 어떤 값을 삭제할 땐 filter를 이용해준다.
  const removeTodo = (index) => {
    // todo filter 활용법을 외워두기 !!!
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  };

  const onBtnAddTodoClick = () => {
    addTodo("안녕");
  };
  
  const onBtnDeleteTodoClick = () => {
    //두번째 인덱스를 삭제
    removeTodo(1);
  };

  return (
    <>
      <button onClick={onBtnAddTodoClick}>추가</button>
      <button onClick={onBtnDeleteTodoClick}>삭제</button>
      <hr />
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.id} {todo.regDate} {todo.content}
          </li>
        ))}
      </ul>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
