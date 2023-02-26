// atomFamily를 사용하여, 각 페이지마다 고유의 값 유지가 안되는 버그 수정
//https://codepen.io/suwonleee/pen/eYLmQEw?editors=0010

// ! atomFamily를 사용해서 각각의 페이지에 다른 값을 활용하기
// 비슷한 atomFamily로 비슷한 atom을 동적으로 생성

import React, {useState} from "react";
import { atomFamily, useRecoilState } from "recoil";

// ! atomFamily로 비슷한 기능 제어
const pageCountAtomFamily = atomFamily({
  key: "app/pageCountAtomFamily",
  //페이지 초기값 넘기기.
  default: (pageNo) => pageNo
});

//! pageNo 변수로 받아주면 페이지마다 제어 가능.
function usePageCount(pageNo) {
  // pageNo -> 페이지별 고유의 값 유지하기 !
  const [count, setCount] = useRecoilState(pageCountAtomFamily(pageNo));
  const increaseOne = () => setCount(count + 1);
  const decreaseOne = () => setCount(count - 1);
  const increaseTen = () => setCount(count + 10);
  const decreaseTen = () => setCount(count - 10);
  const clear = () => setCount(0);
  
  return {
    count,
    increaseOne,
    decreaseOne,
    increaseTen,
    decreaseTen,
    clear,
  }
}

function Page1() {
  const pageCountState = usePageCount(1);
  
  return (
    <>
      <h1>페이지 1</h1>
      
      <ul>
        <li>페이지 1의 숫자 : {pageCountState.count}</li>
        <li>
          <button onClick={pageCountState.increaseOne}>증가 1</button>
          <button onClick={pageCountState.decreaseOne}>감소 1</button>
          <button onClick={pageCountState.increaseTen}>증가 10</button>
          <button onClick={pageCountState.decreaseTen}>감소 10</button>
          <button onClick={pageCountState.clear}>초기화</button>
        </li>
      </ul>
    </>
  );
}

function Page2() {
  const pageCountState = usePageCount(2);
  
  return (
    <>
      <h1>페이지 2</h1>
      
      <ul>
        <li>페이지 2의 숫자 : {pageCountState.count}</li>
        <li>
          <button onClick={pageCountState.increaseOne}>증가 1</button>
          <button onClick={pageCountState.decreaseOne}>감소 1</button>
          <button onClick={pageCountState.increaseTen}>증가 10</button>
          <button onClick={pageCountState.decreaseTen}>감소 10</button>
          <button onClick={pageCountState.clear}>초기화</button>
        </li>
      </ul>
    </>
  );
}

function Page3() {
  const pageCountState = usePageCount(3);
  
  return (
    <>
      <h1>페이지 3</h1>
      
      <ul>
        <li>페이지 3의 숫자 : {pageCountState.count}</li>
        <li>
          <button onClick={pageCountState.increaseOne}>증가 1</button>
          <button onClick={pageCountState.decreaseOne}>감소 1</button>
          <button onClick={pageCountState.increaseTen}>증가 10</button>
          <button onClick={pageCountState.decreaseTen}>감소 10</button>
          <button onClick={pageCountState.clear}>초기화</button>
        </li>
      </ul>
    </>
  );
}

function Page4() {
  const pageCountState = usePageCount(4);
  
  return (
    <>
      <h1>페이지 4</h1>
      
      <ul>
        <li>페이지 4의 숫자 : {pageCountState.count}</li>
        <li>
          <button onClick={pageCountState.increaseOne}>증가 1</button>
          <button onClick={pageCountState.decreaseOne}>감소 1</button>
          <button onClick={pageCountState.increaseTen}>증가 10</button>
          <button onClick={pageCountState.decreaseTen}>감소 10</button>
          <button onClick={pageCountState.clear}>초기화</button>
        </li>
      </ul>
    </>
  );
}

function App() {
  const [pageNo, setPageNo] = useState(1);
  //페이지 바꿔주는 버튼을 누르면 +1 페이지 나오게 해주기, 만약 4보다 크다면 다시 1로
  const switchPage = () => {
    setPageNo(pageNo + 1 <= 4 ? pageNo + 1 : 1);
  };
  const pageName = 'page' + pageNo;

  return (
    <>
      <button onClick={switchPage}>스위치</button>
      {pageName === "page1" && <Page1 />}
      {pageName === "page2" && <Page2 />}
      {pageName === "page3" && <Page3 />}
      {pageName ==="page4" && <Page4 />}
      
    </>
  );
}

export default App;

// index.js 관련 코드
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <RecoilRoot>
//     <App />
//   </RecoilRoot>
// );