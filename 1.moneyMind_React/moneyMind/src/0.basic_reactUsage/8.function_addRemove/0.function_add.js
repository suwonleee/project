// 간단하게 리스트에 값을 추가하는 방법
//https://codepen.io/suwonleee/pen/ExppOVX?editors=0010
// !
// *
// ?
// TODO: 
// @param myParam 

import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

let AppCallCount = 0;

function App() {
  //useState 지정
  const [todos, setTodos] = useState([]);
  
  // newTodo 가 들어오면 기존의 값에 새 값 추가
  const addTodo = (newTodo) => {
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  }
  
  // * 클릭하면 하나 더 추가된 값을 addTodo 인자로 넘겨주기
  const onClick = () => {
    //const newTodos = [...todos, todos.length + 1];
    //setTodos(newTodos);
    
    addTodo(todos.length + 1);
  };

  return <button onClick={onClick}>{JSON.stringify(todos)}</button>;
}

ReactDOM.render(<App />, document.getElementById("root"));
