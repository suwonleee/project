import React, {useState} from "react";
import { atom, useRecoilState } from "recoil";

const page1NoAtom = atom({
  key: "app/page1NoAtom",
  default: 0
});

const page2NoAtom = atom({
  key: "app/page2NoAtom",
  default: 0
});

function Page1() {
  const [no, setNo] = useRecoilState(page1NoAtom);

  return (
    <>
      <h1>페이지 1</h1>
      <ul>
        <li>페이지 1의 숫자 : {no}</li>
        <li><button onClick={() => setNo(no + 10)}>+10</button></li>
        <li><button onClick={() => setNo(no - 10)}>-10</button></li>
      </ul>
    </>
  )
}

function Page2() {
  const [no, setNo] = useRecoilState(page2NoAtom);

  return (
    <>
      <h1>페이지 2</h1>
      
      <ul>
        <li>운동 횟수 : {no}</li>
        <li><button onClick={() => setNo(no + 10)}>+10</button></li>
        <li><button onClick={() => setNo(no - 10)}>-10</button></li>
      </ul>
    </>
  )
}

function App() {
  const [pageName, setPageName] = useState('page1');
  const switchPage = () => setPageName(pageName === 'page1' ? 'page2' : 'page1');
  return (
    <>
      <button onClick={switchPage}>스위치</button>
      {pageName === 'page1' && <Page1/>}
      {pageName === 'page2' && <Page2/>}
      <div className="App">하하 안녕하세요.</div>
    </>
  );
}

export default App;