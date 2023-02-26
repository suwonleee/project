//https://codepen.io/suwonleee/pen/LYBgRXK?editors=0010

import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

function App() {
  //버튼을 클릭할 때마다 담을 리스트를 useState에 담기.
  const [todos, setTodos] = useState([]);

  //! addTodo 지정
  const addTodo = (newContent) => {

    // Todo 만약 id가 추가될 때마다 하나씩 늘어나고 싶다면 ???? -> 다음 파일
    const newTodo = {
      id: 1,
      content: newContent,
      regDate: "2023-01-31 11:47:30"
    };

    //새로운 변수에 값을 추가 -> useState로 값 넘기기
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
