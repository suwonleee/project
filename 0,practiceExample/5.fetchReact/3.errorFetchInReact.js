// 리액트에서 fetch 사용
//https://codepen.io/suwonleee/pen/poOwmRb?editors=0011

import React, { useState, useEffect } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

/*
// 리액트 라우터(화면 이동)
import {
  HashRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
  useParams,
  useNavigate
} from "https://cdn.skypack.dev/react-router-dom@6";
*/

/*
// 리코일
import {
  RecoilRoot,
  atom,
  useRecoilState
} from "https://cdn.skypack.dev/recoil";
*/

function App() {
  const [no, setNo] = useState(0);

  fetch("https://picsum.photos/v2/list?page=1&limit=5")
    .then((data) => data.json())
    .then((data) => {
      //버튼을 다시 누를 때마다 다시 로딩 되는 중복이 발생
      console.log("데이터 로딩 완료");
    });

  return (
    <>
      <button onClick={() => setNo(no + 1)}>숫자 : {no}</button>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
