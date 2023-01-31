//https://codepen.io/suwonleee/pen/LYBgRXK?editors=0010

import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

function App() {
  const [todos, setTodos] = useState([]);

  //! addTodo 지정
  const addTodo = (newContent) => {

    // Todo 만약 id가 추가될 때마다 하나씩 늘어나고 싶다면
    const newTodo = {
      id: 1,
      content: newContent,
      regDate: "2022-04-19 12:12:12"
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  //! 버튼을 클릭했을때 추가할 문구 지정
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
