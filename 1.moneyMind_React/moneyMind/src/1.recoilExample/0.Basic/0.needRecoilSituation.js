// 리코일이 필요한 상황 만들기, 각 페이지에서 no값을 유지해야 하는 상황
//https://codepen.io/suwonleee/pen/eYLNqeJ?editors=0010

//! 각 페이지에 no 숫자를 증가시켰지만, 페이지 전환 버튼을 누르면 그대로 원상복귀 된다.
//todo   recoil은 이러한 상황에 no 값을 유지해주기 위해 별도의 저장 기능을 하게된다.


import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

function Page1() {
  const [no, setNo] = useState(0);
  
  return (
    <>
      <h1>페이지 1</h1>
      
      <ul>
        <li>페이지 1의 숫자 : {no}</li>
        <li><button onClick={() => setNo(no + 10)}>페이지 1의 숫자 증가</button></li>
        <li><button onClick={() => setNo(no - 10)}>페이지 1의 숫자 감소</button></li>
      </ul>
    </>
  )
}


function Page2() {
  const [no, setNo] = useState(0);
  
  return (
    <>
      <h1>페이지 2</h1>
      
      <ul>
        <li>운동횟수 : {no}</li>
        <li><button onClick={() => setNo(no + 1)}>횟수 증가</button></li>
        <li><button onClick={() => setNo(0)}>횟수 초기화</button></li>
      </ul>
    </>
  )
}


function App() {
  const [pageName, setPageName] = useState('page1');
  
  const switchPage = () => setPageName(pageName == 'page1' ? 'page2' : 'page1');
  
  return <>
    <button onClick={switchPage}>스위치</button>
    {pageName == 'page1' && <Page1 />}
    {pageName == 'page2' && <Page2 />}
  </>;
}

ReactDOM.render(<App />, document.getElementById("root"));

