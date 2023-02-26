//atom을 사용해서 각 페이지의 no값을 전역변수 화
//https://codepen.io/suwonleee/pen/ExejqbN?editors=0010

import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
import {
  //리코일 import 해주기
  RecoilRoot,
  atom,
  useRecoilState
} from "https://cdn.skypack.dev/recoil";

const page1NoAtom = atom({
  key: "app/page1NoAtom",
  default: 0
});

const page2NoAtom = atom({
  key: "app/page2NoAtom",
  default: 0
});

function Page1() {
  //! 리코일 페이지 1 전역변수화.
  const [no, setNo] = useRecoilState(page1NoAtom);

  return (
    <>
      <h1>페이지 1</h1>

      <ul>
        <li>페이지 1의 숫자 : {no}</li>
        <li>
          <button onClick={() => setNo(no + 10)}>페이지 1의 숫자 증가</button>
        </li>
        <li>
          <button onClick={() => setNo(no - 10)}>페이지 1의 숫자 감소</button>
        </li>
      </ul>
    </>
  );
}

function Page2() {
    //! 리코일 페이지 2 전역변수화.
  const [no, setNo] = useRecoilState(page2NoAtom);

  return (
    <>
      <h1>페이지 2</h1>

      <ul>
        <li>운동횟수 : {no}</li>
        <li>
          <button onClick={() => setNo(no + 1)}>횟수 증가</button>
        </li>
        <li>
          <button onClick={() => setNo(0)}>횟수 초기화</button>
        </li>
      </ul>
    </>
  );
}

function App() {
  const [pageName, setPageName] = useState("page1");

  const switchPage = () => setPageName(pageName == "page1" ? "page2" : "page1");

  return (
    <>
      <button onClick={switchPage}>스위치</button>
      {pageName == "page1" && <Page1 />}
      {pageName == "page2" && <Page2 />}
    </>
  );
}

function Root() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
