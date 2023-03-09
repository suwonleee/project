//https://codepen.io/suwonleee/pen/wvEPMBJ?editors=0011
// 통신 로직이 포함된 PImg 컴포넌트

import React, { useState, useEffect } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "https://cdn.skypack.dev/react-query@3";

const queryClient = new QueryClient();

// ! PImg 함수에 지정
function PImg({ id }) {
  const {
    isLoading, 
    error,
    data: img
  } = useQuery(`https://picsum.photos/id/${id}/info`, () =>
    fetch(`https://picsum.photos/id/${id}/info`).then((data) => data.json())
  );

  if (error) {
    return <>에러 : {error.message}</>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  return <img src={img.download_url} style={{ width: 500 }} />;
}

function App() {
  const [no, setNo] = useState(0);

  const {
    isLoading,
    error,
    data: imgs
  } = useQuery("https://picsum.photos/v2/list?page=1&limit=5", () =>
    fetch("https://picsum.photos/v2/list?page=1&limit=5").then((data) =>
      data.json()
    )
  );

  if (error) {
    return <>에러 : {error.message}</>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
    {/* //! PImg 함수를 불러 원하는 번호 데이터를 출력 */}
      <PImg id={55} />
      <PImg id={22} />
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
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
