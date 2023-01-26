// useCallback 으로 어이없는 리랜더링 막기
//https://codepen.io/suwonleee/pen/qByoGpK?editors=0011
// ** 버튼 1을 누르면 함수가 리랜더링 되고, 버튼 2를 누르면 리랜더링 되지 않게 만들기

import React, { useState, useCallback } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

let SubCallCount = 0;

function Sub({ no1, no2, calculateFunc }) {
  SubCallCount++;
  console.log(`Sub가 ${AppCallCount}번 실행됨!`);

  return (
    <div style={{ border: "10px solid red", padding: 10 }}>
      입력 : {no1}, {no2}
      <br />
      결과 : {calculateFunc(no1, no2)}
    </div>
  );
}

let AppCallCount = 0;


const MemoizedSub = React.memo(Sub);


//함수를 한번만 불러와서 재실행을 막기 위해선, 이렇게 밖에서 실행 해주면 된다.
// const calculateFunc = useCallback((a, b) => a + b + no1, [no1]);
//그렇지만, 함수 내부에서 새로운 변수를 받는 경우엔 ??!?
function App() {
  AppCallCount++;
  console.log(`App이 ${AppCallCount}번 실행됨!`);

  const [no1, setNo1] = useState(0);
  const [no2, setNo2] = useState(0);

  // 그냥 함수로 작성했으면 매번 재실행된다 
  // ** useCallback 은 useMemo랑 비슷, 함수를 기억하고 실행한다.
  //no1 이 바뀌면 함수 리랜더링
  //no2 는 바뀌어도 useCallback 은 신경을 안 쓴다.
  const calculateFunc = useCallback((a, b) => a + b + no1, [no1]);

  return (
    <>
      <button onClick={() => setNo1(no1 + 1)}>버튼1 : {no1}</button>
      <hr />
      <button onClick={() => setNo2(no2 + 1)}>버튼2 : {no2}</button>
      <hr />
      <MemoizedSub no1={10} no2={20} calculateFunc={calculateFunc} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
