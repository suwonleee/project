//https://codepen.io/suwonleee/pen/dyqPQRO?editors=0010

// useSetRecoilState & useRecoilValue

// ! useSetRecoilState -> 상태를 변경해줄 수도 있다.
// ! useRecoilValue -> 값을 불러와주기.
import React, {useState} from "react";
import { atom, useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";

const page1NoAtom = atom({
  key: "app/page1NoAtom",
  default: 0
});

const page2NoAtom = atom({
  key: "app/page2NoAtom",
  default: 0
});

function Page1() {
  // page1NoAtom에 페이지 1 상태를 담아서 옮기기.
  const [no, setNo] = useRecoilState(page1NoAtom);
  // ********  useSetRecoilState   ***************
  // use  'Set'  RecoilState : 페이지1에서 페이지2 상태를 제어할 수 있게 만들기.
  const setPage2No = useSetRecoilState(page2NoAtom);
  // 버튼을 누르면 페이지 2번의 상태를 초기화.
  const onClick = () => setPage2No(0);

  return (
    <>
      <h1>페이지 1</h1>
      <div>
        <button onClick={onClick}>페이지2의 값을 초기화</button>
      </div>
      <ul>
        <li>페이지 1의 숫자 : {no}</li>
        <li><button onClick={() => setNo(no + 10)}>+10</button></li>
        <li><button onClick={() => setNo(no - 10)}>-10</button></li>
      </ul>
    </>
  )
}

function Page2() {
  // ********  useRecoil  'Value'   ***************
  //useRecoilValue : 페이지 2에서 page1 값을 읽어오기.
  const page1No = useRecoilValue(page1NoAtom);
  const [no, setNo] = useRecoilState(page2NoAtom);

  return (
    <>
      <h1>페이지 2</h1>
      <div>페이지 1의 숫자 : {page1No}</div>
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
  //페이지 전환 시키는 방법
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