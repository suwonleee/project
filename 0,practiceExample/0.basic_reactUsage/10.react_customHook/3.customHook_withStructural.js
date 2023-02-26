//! 커스텀 상태를 구조분해 하지않고, 바로 자식에게 넘김
//https://codepen.io/suwonleee/pen/VwBqaBL?editors=0010

import React, { useState, useRef } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

//! 이전 코드
//function TodoApp({ addTodo, removeTodo, modifyTodo, todos }) {

// todo 코드를 굳이 밑에서 받아주는 것이 아닌, 위에서 한번에 받아줄 수 있다.
function TodoApp({ todosState }) {
  const { addTodo, removeTodo, modifyTodo, todos } = todosState;

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
  );
}

function useTodosState() {
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

  return {
    todos,
    addTodo,
    modifyTodo,
    removeTodo
  };
}

function App() {
  // ! 이전 코드
  //  const {addTodo, removeTodo, modifyTodo, todos} = useTodosState();


  const todosState = useTodosState();
  // ! 이전에 사용했던 코드
{/* <TodoApp
        addTodo={addTodo}
        removeTodo={removeTodo}
        modifyTodo={modifyTodo}
        todos={todos} */}
  return (
    <>
      <TodoApp todosState={todosState} />
      {/* //todo 위에서 정리해준 덕분에 밑에서 변수 하나로 편하게 받는다. */}
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
