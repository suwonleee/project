//useEffect를 통해서 쓸데없는 중복통신을 안하도록
//https://codepen.io/suwonleee/pen/jOvwoVW?editors=0011
console.clear();

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
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    //기본적으로 5개 데이터 불러오기
    fetch("https://picsum.photos/v2/list?page=1&limit=5")
      .then((data) => data.json())
      .then((data) => setImgs(data));
  }, []);
  // useEffect의 []을 사용해서 최초 한번만 로딩

  return (
    <>
      <ul>
        {imgs.map((img) => (
          <li key={img.id}>
            번호 : {img.id}
            <br />
            작가 : {img.author}
          </li>
        ))}
      </ul>
      <button onClick={() => setNo(no + 1)}>숫자 : {no}</button>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
