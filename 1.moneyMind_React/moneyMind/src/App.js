// atomFamily
// 비슷한 atomFamily로 비슷한 atom을 동적으로 생성
import React, {useState} from "react";
import { atomFamily, useRecoilState } from "recoil";

const pageCountAtomFamily = atomFamily({
  key: "app/pageCountAtomFamily",
  default: (pageNo) => pageNo
});

function usePageCount(pageNo) {
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