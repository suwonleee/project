//https://codepen.io/suwonleee/pen/poZQoGj?editors=0012

const todos = [
  {
    id:1,
    list: "apple",
    content:"안녕"
  },
  {
    id:2,
    list: "banana",
    content:"잘가"
  },
  {
    id:3,
    list: "pineapple",
    content:"또봐"
  }
];

const newTodo = { ...todos[2], content:'잘가' };
//이걸 실행하면 "id":3 의 content 값이 '잘가'


console.log(newTodo);

const index = 2;
const newContent = '새로 다른 콘텐츠로 바꿔준다.';
// ! 어떤 값을 삭제하거나 수정할 땐, map을 사용해준다.
// _index 차례가 index(2)와 같지 않으면 todo를 그대로 담아주고,
// 해당 인덱스가 되면 todo를 그대로 받아주고, content만 newContent로 바꿔준다.
const newTodos = todos.map((todo, _index) => _index != index ? todo : {...todo, list:newContent})
//id:3 의 list 값이 ㅋㅋ으로 바뀐다.

console.log(todos);
console.log(newTodos);