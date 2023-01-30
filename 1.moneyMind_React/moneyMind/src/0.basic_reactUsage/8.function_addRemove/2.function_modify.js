//https://codepen.io/suwonleee/pen/PoBdomv?editors=0010

import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

let AppCallCount = 0;

function App() {
  const [todos, setTodos] = useState([]);
  
  // ! addTodo 지정
  const addTodo = (newTodo) => {
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  }
  
  // ! removeTodo 지정
  const removeTodo = (index) => {
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  }
  
  // ! modifyTodo 지정
  const modifyTodo = (index, newTodo) => {
    const newTodos = todos.map((todo, _index) => _index != index ? todo : newTodo);
    setTodos(newTodos);
  }
  
  const onAddBtnClick = () => {
    addTodo(todos.length + 1);
  };
  
  const onRemoveBtnClick = () => {
    removeTodo(1);
  };
  
  const onEditBtnClick = () => {
    modifyTodo(1, 'ㅋㅋㅋ');
  }

  return <>
    <div>{JSON.stringify(todos)}</div>
    <button onClick={onAddBtnClick}>추가</button>
    <button onClick={onRemoveBtnClick}>삭제</button>
    <button onClick={onEditBtnClick}>수정</button>
  </>;
}

ReactDOM.render(<App />, document.getElementById("root"));
