//숫자기록입력상자에 useRef를 이용하여 dom 조작
//11.useState_domControl과 비교해서 보기
//https://codepen.io/suwonleee/pen/WNKzWQK?editors=0010

// 숫자를 입력해서 기록하기
// v1 정답 예시 : 10, 20, 30
// v2 정답 예시 : li로 표기된 10, 20, 30
// v2-2 정답 예시 : li로 표기된 10, 20, 30

import React, { useState, useRef } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

let AppCallCount = 0;

function App() {
  const noInputRef = useRef(null);
  const [no, setNo] = useState("");

  const [recordedNos, setRecordedNos] = useState([10, 20, 30]);

  //숫자를 입력 받으면 그 값에 접근, 저장하는 함수
  const saveNo = () => {	
    if (no === "") { //비어있을 경우
      alert("숫자를 입력해주세요.");
    }
    //setRecordedNos에 복사 해주기
    
    setRecordedNos([...recordedNos, no]); //기존 recordedNos에 no 추가 
    setNo("");
    noInputRef.current.focus();//입력 행위 후 다시 포커스를 입력 창으로 바꿔주기
  };
  

  //기존 리스트에 새로운 인덱스 값 추가해주기
  const li = recordedNos.map((el, index) => <li key={index}>{el}</li>);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault(); //폼이 전송되는 것을 막기.

          //숫자를 입력 받으면 그 값에 접근, 저장하는 함수
          saveNo();	
          // prevent 막는다.
          // Default 기본적으로.
          // 활용예
          // EX : 링크를 클릭시 이동을 막는다.
          // EX : 폼 전송 클릭 => 폼이 발송되는 것을 막는다.
          // EX 마우스 휠 => 세로 스크롤바 이동을 막는다.
        }}
      >
        <input
          type="number"
          ref={noInputRef}	// 내가 만든 useRef를 장착 시키기. -> 특정 엘리먼트를 DOM 조작해주기 위해서
          value={no}
          //onChange 이벤트가 발생하면, e.target.value 값을 통하여 이벤트 객체에 담겨있는 현재의 텍스트 값을 읽어올 수 있습니다. 
          onChange={(e) => setNo(e.target.valueAsNumber)}
        />
        <button type="submit">기록</button>
      </form>

      <hr />

      <h1>기록된 숫자 v1</h1>
      {/* 새로운 숫자 추가해주는 방법 1 */}
      {recordedNos.join(",")} 

      <hr />

      <h1>기록된 숫자 v2</h1>
      {/* 새로운 숫자 추가해주는 방법 2 */}
      <ul>{li}</ul>

      <hr />

      <h1>기록된 숫자 v2-2</h1>
      {/* 새로운 숫자 추가해주는 방법 3 */}
      <ul>
        {recordedNos.map((el, index) => (
          <li key={index}>{el}</li>
        ))}
      </ul>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
