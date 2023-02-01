//https://codepen.io/suwonleee/pen/QWBZome?editors=0010

import React, { useState, useRef } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

function App() {
  const [todos, setTodos] = useState([]);
  //useRef 지정
  const lastTodoIdRef = useRef(0);

  const addTodo = (newContent) => {
    //지정한 useRef를 값이 바뀔 때마다 +1 해서 리로드
    const id = ++lastTodoIdRef.current;
    
    const newTodo = {
      id,
      content: newContent,
      regDate: "2023-01-31 11:47:30"
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const onBtnAddTodoClick = () => {
    addTodo("안녕");
  };

  return (
    <>
      <button onClick={onBtnAddTodoClick}>추가</button>
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
