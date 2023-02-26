// counter 가 늘어날 때마다, 표현 방식 다르게 변경하기
// 짝수, 홀수, 8의 배수 

//https://codepen.io/suwonleee/pen/vYaRPdL?editors=0010

import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

function App() {
  const [no, setNo] = useState(0);
  const noIsEvenDiv = (
    <>
      <hr/>
      {/* 짝수와 홀수일 때 각각 다른 문장 출력 */}
      {no % 2 == 0 ? <div>짝수입니다.</div> : <div>홀수입니다.</div>}
    </>
  );

  // 8의 배수를 만족하면 함수가 동작하게 or(||) 조건에 넣어주기
  const noIsNot8MultipleDiv = no % 8 == 0 || (
    <>
      <hr />
      {/* 8의 배수가 아닐땐 */}
      <div>8의 배수가 아닙니다.</div>
    </>
  );

  return (
    <>
      숫자 : {no}
      <hr />
      {/* 1씩 증가하는 버튼 추가. */}
      <button onClick={() => setNo(no + 1)}>증가</button>
      {/* 짝수 홀수 구분, 8의 배수 구분 추가 */}
      {noIsEvenDiv}
      {/* 8의 배수 조건 추가 */}
      {noIsNot8MultipleDiv}
    </>
  )
}
ReactDOM.render(<App />, document.getElementById("root"));