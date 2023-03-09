// 리액트 쿼리가 없는 상태에서 로딩과 예외처리
//https://codepen.io/suwonleee/pen/WNgXQgR

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

  //! 다음 파일인 1.파일 에서 이 useState를 ReactQuery로 수정 예정
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=5")
      .then((data) => data.json())
      .then((data) => setImgs(data))
      .then(() => setIsLoading(false))
      .catch((err) => setError(new Error(404)));
  }, []);

  if (error) {
    return <>에러 : {error.message}</>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

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
