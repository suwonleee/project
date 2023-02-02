//https://codepen.io/suwonleee/pen/RwBErBO?editors=0010

import React, { useState, useRef } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

function TodoApp({ addTodo, removeTodo, modifyTodo, todos }) {
  //! 함수 내부로 이동 (위에 변수에는 진짜 필요한 것만 지정)
  // 버튼 안에서 실행해야하기 때문에 함수 안에서 지정

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

  return (
    <>
    {/* <TodoApp onBtnAddTodoClick={onBtnAddTodoClick} onBtnDeleteTodoClick={onBtnDeleteTodoClick} onBtnModifyTodoClick={onBtnModifyTodoClick} todos={todos} /> */}

    {/* //* 원래 코드는 위와 같이 작성 */}

    {/* //*그러나, 위에는 추상적인 함수를 주고, 특정 디자인에 관련된 함수들은 밑에 작성 */}
      <TodoApp
        addTodo={addTodo}
        removeTodo={removeTodo}
        modifyTodo={modifyTodo}
        todos={todos}
      />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
