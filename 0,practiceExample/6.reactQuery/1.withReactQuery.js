//리액트 쿼리를 도입
//https://codepen.io/suwonleee/pen/oNPojPO?editors=0010

import React, { useState, useEffect } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "https://cdn.skypack.dev/react-query@3";

//리액트 쿼리를 지정. 
const queryClient = new QueryClient();


function App() {
  const [no, setNo] = useState(0);

  //! 기존에 useState로 일일이 지정해줬던 것을 한번에 
  const {
    isLoading,
    error,
    data: imgs
  } = useQuery("https://picsum.photos/v2/list?page=1&limit=5", () =>
    fetch("https://picsum.photos/v2/list?page=1&limit=5").then((data) =>
      data.json()
      // 지정해준 data 사용
    )
  );

  //지정해준 error 사용
  if (error) {
    return <>에러 : {error.message}</>;
  }

  //지정해준 isLoading 사용
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

function Root() {
  return (
    //! 리액트 쿼리를 사용해주기 위해 app을 감싸줌.
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
