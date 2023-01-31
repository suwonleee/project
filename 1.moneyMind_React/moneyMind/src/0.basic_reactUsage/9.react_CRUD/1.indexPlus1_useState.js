//https://codepen.io/suwonleee/pen/rNrqWMR?editors=0010

import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

function App() {
  const [todos, setTodos] = useState([]);
  //useState에 인덱스로 받아서 넘길 값을 지정
  const [lastTodoId, setLastTodoId] = useState(0);

  //! addTodo 시작 부분
  const addTodo = (newContent) => {

    //id를 현재 나타낼 값 지정
    const id = lastTodoId + 1;
    //useState로 다음 값 넘기기.
    setLastTodoId(id);
    
    const newTodo = {
      id,
      content: newContent,
      regDate: "2023-01-31 11:47:30"
    };

    //새로운 변수에 값을 추가 -> useState로 다음 값 넘기기
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
