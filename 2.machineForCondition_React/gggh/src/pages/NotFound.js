import React, { useState, useEffect } from 'react';

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

function NotFound() {
  const [no, setNo] = useState(0);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=5")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        console.log(data[0]["author"]);
      })
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
        {/* {imgs[1].author} */}
      </ul>
      <button onClick={() => setNo(no + 1)}>숫자 : {no}</button>
    </>
  );
}
export default NotFound;
