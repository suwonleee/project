//https://codepen.io/suwonleee/pen/vYavGBq?editors=0010
// ! 커스텀 훅으로 UI와 관계없는 핵심 로직과 상태들을 묶을 수 있다
import React, { useState, useRef } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

//상태를 받아서 보여주는 역할
function TodoApp({ addTodo, removeTodo, modifyTodo, todos }) {
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
// ! add / modify / remove 를 묶어준다.
// todo 사실 세 함수는 비슷한 역할을 하고 있었다. 핵심 로직을 하는 역할. 그래서 묶어준다.
// 커스텀훅은 use___State 로 이름 짓는거 추천 ! 
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
  
  // todo 묶어준 녀석들을 출력해주기
  return {
    todos,
    addTodo,
    modifyTodo,
    removeTodo
  }
}

//App은 상태들을 만드는 역할
function App() {
  //! 로직 부분
  // todo 저렇게 만들어준 함수를 App 안에서 지정해주어 사용
  const {addTodo, removeTodo, modifyTodo, todos} = useTodosState();


  //! UI 부분
  return (
    <>
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
