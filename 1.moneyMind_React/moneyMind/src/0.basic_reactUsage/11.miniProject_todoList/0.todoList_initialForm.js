// !  새 할일 폼 만들기
//https://codepen.io/suwonleee/pen/ZEjVOQZ?editors=0010

import React, { useState, useRef } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

//! 할 일 폼 만들기
function NewTodoForm({todosState}) {
  const onSubmit = (e) => {
    e.preventDefault();
    
    //todo 과정 ( 받정추비 )
    //todo 값 받기 -> 정리하기 -> 추가하기 -> 비우기

    // 입력 받은 텍스트를 활용 해주기 위한 작업
    const form = e.target;
    form.content.value = form.content.value.trim();
    
    // 텍스트가 없을 경우
    if ( form.content.value.length == 0 ) {
      alert('할일을 입력해주세요.');
      // 다시 포커스 입력 폼으로 돌려주기
      form.content.focus();
      
      return;
    }
    
    //값을 기존 할 일 리스트에 추가 (여기서는 우리가 만든 addTodo를 이용한다.)
    todosState.addTodo(form.content.value);
    
    // 입력 폼은 다시 비우고, 포커스 가져오기
    form.content.value = '';
    form.content.focus();
  }
  
  return (
    <form onSubmit={onSubmit}>
      <input autoComplete="off" name="content" type="text" placeholder="할일을 입력해주세요." />
      <input type="submit" value="추가" />
      <input type="reset" value="취소" />
    </form>
  );
}

// ! 상태를 받아서 보여주는 역할
function TodoApp({ todosState }) {
  return (
    <>
    {/* 새로 만든 폼을 적용 */}
      <NewTodoForm todosState={todosState} />
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

// ! 주요 기능 하는 애들을 커스텀 훅으로 묶어놓음
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
