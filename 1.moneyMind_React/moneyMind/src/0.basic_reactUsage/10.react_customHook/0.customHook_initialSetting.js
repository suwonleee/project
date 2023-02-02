// https://codepen.io/suwonleee/pen/jOpXWpr?editors=0010
// ! 할일리스트앱을 상위(로직) 컴포넌트와 하위(UI) 컴포넌트로 분리
import React, { useState, useRef } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

//! 커스텀 훅 기본 세팅
//상태를 받아서 보여주는 역할
function TodoApp({onBtnAddTodoClick, onBtnDeleteTodoClick, onBtnModifyTodoClick, todos}) {
  

  
  return (
    <>
      <button onClick={onBtnAddTodoClick}>추가</button>
      <button onClick={onBtnDeleteTodoClick}>삭제</button>
      <button onClick={onBtnModifyTodoClick}>수정</button>
      <hr />
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.id} {todo.regDate} {todo.content}
          </li>
        ))}
      </ul>
    </>
  )
}

//App은 상태들을 만드는 역할
function App() {
  const [todos, setTodos] = useState([]);
  const lastTodoIdRef = useRef(0);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;

    const newTodo = {
      id,
      content: newContent,
      regDate: "2022-04-19 12:12:12"
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const modifyTodo = (index, newContent) => {
    const newTodos = todos.map((todo, _index) =>
      _index != index ? todo : { ...todo, content: newContent }
    );
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  };

  const onBtnAddTodoClick = () => {
    addTodo("안녕");
  };

  const onBtnDeleteTodoClick = () => {
    removeTodo(1);
  };

  const onBtnModifyTodoClick = () => {
    modifyTodo(1, "ㅋㅋㅋ");
  };

  return (
    <>
      <TodoApp onBtnAddTodoClick={onBtnAddTodoClick} onBtnDeleteTodoClick={onBtnDeleteTodoClick} onBtnModifyTodoClick={onBtnModifyTodoClick} todos={todos} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
