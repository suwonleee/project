// !  새 할일 폼에 삭제 추가하기 툴
//https://codepen.io/suwonleee/pen/RwBvQdP?editors=0010

import React, { useState, useRef } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

function TodoListItem({ todosState, todo, index }) {
  //수정 모드를 사용해주기 위해 useState 활용
  const [editMode, setEditMode] = useState(false);

  // 에디트 모드에 있는 콘텐츠 값을 담아주는 useState
  //todo.content  -> useState초기 값을 원래 들어있는 값으로 설정
  const [editedContent, setEditedContent] = useState(todo.content);

  // ! 삭제 기능 
  const removeTodo = () => {
    //todosState로 인덱스 받아와주기
    todosState.removeTodo(index);
  };

  // ! 수정 기능 활용 
  const showEdit = () => {
    setEditMode(true);
  };

  // ! 에디트 모드를 사용한다면 
  const commitEdit = () => {
    setEditMode(false);
  }

  // ! 에디트 모드를 취한다면
  const cancelEdit = () => {
    setEditMode(false);
    //todo.content는 useState의 초기값. 그러니 취소해도 초기값으로
    setEditedContent(todo.content);
  }


  return (
    <li>
      {todo.id}
      &nbsp;
      {todo.regDate}
      &nbsp;
      {/* // ! 수정 기능을 클릭하지 않은 경우, 버튼이 보이게 -> editMode 가 false */}
      {editMode || (
        <>
          {todo.content}
          &nbsp;
          <button onClick={showEdit}>수정</button>
        </>
      )}
      {/* // ! 수정 기능을 클릭한 경우, 텍스트 입력 폼 보이고, 그 안에 원래 값/변경 값을 담아준다. -> editMode 가 true */}
      {editMode && <>
        {/* (e) => setEditedContent(e.target.value)로 입력 폼에 값 전달되게 만들기 */}
        <input type="text" placeholder="할일을 입력해주세요." value={editedContent}
        // e.target.value 로 입력 폼 값에 접근하여 setEditedContent로 저장
        onChange={(e) => setEditedContent(e.target.value)} />
        &nbsp;
        <button onClick={commitEdit}>수정완료</button>
        &nbsp;
        <button onClick={cancelEdit}>수정취소</button>
      </>}
      &nbsp;
      <button onClick={removeTodo}>삭제</button>
    </li>
  );
}

function TodoList({ todosState }) {
  return (
    <ul>
      {todosState.todos.map((todo, index) => (
        <TodoListItem
          todosState={todosState}
          key={todo.id}
          todo={todo}
          index={index}
        />
      ))}
    </ul>
  );
}

function NewTodoForm({ todosState }) {
  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할일을 입력해주세요.");
      form.content.focus();

      return;
    }

    todosState.addTodo(form.content.value);
    form.content.value = "";
    form.content.focus();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        autoComplete="off"
        name="content"
        type="text"
        placeholder="할일을 입력해주세요."
      />
      <input type="submit" value="추가" />
      <input type="reset" value="취소" />
    </form>
  );
}

function TodoApp({ todosState }) {
  return (
    <>
      <NewTodoForm todosState={todosState} />
      <hr />
      <TodoList todosState={todosState} />
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
      regDate: dateToStr(new Date())
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  // ! 수정하기 기능 추가. 
  const modifyTodo = (index, newContent) => {
    //수정할 땐 map 사용
    const newTodos = todos.map((todo, _index) =>
      _index != index ? todo : { ...todo, content: newContent }
    );
    setTodos(newTodos);
  };

  //! 삭제하기 기능 추가
  const removeTodo = (index) => {
    //삭제할 땐 filter 사용
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

// 유틸리티

// 날짜 객체 입력받아서 문장(yyyy-mm-dd hh:mm:ss)으로 반환한다.
function dateToStr(d) {
  const pad = (n) => {
    return n < 10 ? "0" + n : n;
  };

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds())
  );
}
