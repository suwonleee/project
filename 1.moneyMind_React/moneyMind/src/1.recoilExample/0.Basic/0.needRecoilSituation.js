//리코일이 필요한 상황 만들기, 페이지1, 페이지2


import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

function Page1() {
  return (
    <>
      <h1>페이지 1</h1>
      
      <ul>
        <li>페이지 1 내용 1</li>
        <li>페이지 1 내용 2</li>
      </ul>
    </>
  )
}

function Page2() {
  return (
    <>
      <h1>페이지 2</h1>
      
      <ul>
        <li>페이지 2 내용 1</li>
        <li>페이지 2 내용 2</li>
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
