//https://codepen.io/suwonleee/pen/abjjxGr?editors=0010

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
    //제거 해주기 위해선 filter
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  }
  
  // ! add버튼을 클릭했을 때
  const onAddBtnClick = () => {
    // 새로운 값에 
    addTodo(todos.length + 1);
  };
  
  // ! remove 버튼을 클릭했을 때
  const onRemoveBtnClick = () => {
    // 인덱스 가장 마지막 값을 제거해주기
    removeTodo(todos.length - 1);
  };

  return <>
    <div>{JSON.stringify(todos)}</div>
    <button onClick={onAddBtnClick}>추가</button>
    <button onClick={onRemoveBtnClick}>삭제</button>
  </>;
}

ReactDOM.render(<App />, document.getElementById("root"));
