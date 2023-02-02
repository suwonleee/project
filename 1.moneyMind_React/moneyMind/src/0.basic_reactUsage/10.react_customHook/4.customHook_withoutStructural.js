// ! 자식이 커스텀 상태를 구조분해 하지않고, 바로 사용
//https://codepen.io/suwonleee/pen/YzjdqJw?editors=0010
console.clear();

import React, { useState, useRef } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

function TodoApp({ todosState }) {
  //! 이전 코드
  //  const { addTodo, removeTodo, modifyTodo, todos } = todosState;

  // todo 또 이걸 재지정 할 필요 없이 그대로 사용해도 지장 없다.
  const onBtnAddTodoClick = () => {
    //    addTodo("안녕"); < -- 기존 코드
    todosState.addTodo("안녕");
  };

  const onBtnDeleteTodoClick = () => {
    todosState.removeTodo(1);
  };

  const onBtnModifyTodoClick = () => {
    todosState.modifyTodo(1, "ㅋㅋㅋ");
  };

  return (
    <>
      <button onClick={onBtnAddTodoClick}>추가</button>
      <button onClick={onBtnDeleteTodoClick}>삭제</button>
      <button onClick={onBtnModifyTodoClick}>수정</button>
      <hr />
      <ul>
        {todosState.todos.map((todo, index) => (
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
  const todosState = useTodosState();

  return (
    <>
      <TodoApp todosState={todosState} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
