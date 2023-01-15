// atomFamily
// 비슷한 atomFamily로 비슷한 atom을 동적으로 생성
import React, {useState} from "react";
import { atomFamily, useRecoilState } from "recoil";

const pageNoAtomFamily = atomFamily({
  key: "app/pageNoAtom",
  default: (no) => 0
});

function Page1() {
  const [no, setNo] = useRecoilState(pageNoAtomFamily(1));
  return (
    <>
      <h1>페이지 1</h1>
      
      <ul>
        <li>페이지 1의 숫자 : {no}</li>
        <li>
          <button onClick={() => setNo(no + 1)}>증가</button>
        </li>
      </ul>
    </>
  );
}

function Page2() {
  const [no, setNo] = useRecoilState(pageNoAtomFamily(2));
  return (
    <>
      <h1>페이지 2</h1>
      
      <ul>
        <li>페이지 2의 숫자 : {no}</li>
        <li>
          <button onClick={() => setNo(no + 1)}>증가</button>
        </li>
      </ul>
    </>
  );
}

function Page3() {
  const [no, setNo] = useRecoilState(pageNoAtomFamily(3));
  return (
    <>
      <h1>페이지 3</h1>
      
      <ul>
        <li>페이지 3의 숫자 : {no}</li>
        <li>
          <button onClick={() => setNo(no + 1)}>증가</button>
        </li>
      </ul>
    </>
  );
}

function Page4() {
  //4페이지 숫자랑 1페이지 숫자 동일하게 적용 
  const [no, setNo] = useRecoilState(pageNoAtomFamily(1));
  return (
    <>
      <h1>페이지 4(페이지 1번 데이터 공유)</h1>
      
      <ul>
        <li>페이지 4의 숫자 : {no}</li>
        <li>
          <button onClick={() => setNo(no + 1)}>증가</button>
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