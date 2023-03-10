//useState 구문은 무조건 함수 제일 위쪽에 모아두어야 합니다.
// https://codepen.io/suwonleee/pen/PoBRXKe?editors=0010
// ** Q. useState를 함수 내에서 사용하고 싶은 경우.

import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

let AppCallCount = 0;

function App() {
  // 왠만하면, 함수의 제일 위쪽
  // if문, for문, while 등 제어문 안쪽에 두지 말자.
  const [no, setNo] = useState(0);
  
  // 클릭할 때 마다 + 1 되게 만들려면
  // const addFunc = () => {setNo((no) => no + 5)}
  // return <button onClick={addFunc}>숫자 : {no}</button>;


  return <button>숫자 : {no}</button>;
}

ReactDOM.render(<App />, document.getElementById("root"));
