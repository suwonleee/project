// React memo로 PrimeNosCount 속도 최적화
// ** Q. 1부터 100사이에 / 200사이에/ 300사이에/ {엄청 큰 수}사이에 존재하는 수 세어주기.
// 그런데 -> React memo로 이미 계산 끝난거 다시 작동 안하게 만들기.

// https://codepen.io/suwonleee/pen/poZLmdE?editors=0011

import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

function isPrimeNumber(no) {
  for ( let i = 2; i < no; i++ ) {
    if ( i * i > no ) {
      break;
    }
    
    if ( no % i == 0 ) {
      return false;
    }
  }
  
  return true;
}

function getPrimeNumbers(max) {
  const primeNumbers = [];
  
  for ( let i = 2; i <= max; i++ ){
    if ( isPrimeNumber(i) ) {
      primeNumbers.push(i);
    }
  }
  
  return primeNumbers;
}

function getPrimeNumbersCount(max) {
  return getPrimeNumbers(max).length;
}

let PrimeNosCountCallCount = 0;

function PrimeNosCount({max}) {
  PrimeNosCountCallCount++;
  console.log(`PrimeNosCount이 ${PrimeNosCountCallCount}번 실행됨!`);
  
  const count = getPrimeNumbersCount(max);
  
  return <div style={{border:'10px solid black', padding:100}}>1부터 {max}사이에 존재하는 소수의 개수는 : {count}개 이다.</div>
}

// 새로운 버전의 컴포넌트
const MemoizedPrimeNosCount = React.memo(PrimeNosCount);
//최초에 PrimeNosCount가 계산한 값을 기억했다가 출력한다.

let AppCallCount = 0;

function App() {
  AppCallCount++;
  console.log(`App이 ${AppCallCount}번 실행됨!`);
  
  const [no, setNo] = useState(2000);
  // 이 값을 2000000 이상으로 수정하면, 버튼을 눌렀을 때 랜더링시간이 점점 느려지기 시작합니다.
  // 왜냐하면 React.memo는 입력값이 달라지면 기억력을 사용해서 빠르게 응답하는 것을 할 수 없기 때문입니다.

  return <>
    {/* 이 녀석은 react.memo 덕분에 1번만 실행됨 */}
    <MemoizedPrimeNosCount max={100} />
    
    <hr />
    
    {/* 이 녀석은 react.memo 덕분에 1번만 실행됨 */}
    <MemoizedPrimeNosCount max={200} />
    
    <hr />
    
    {/* 이 녀석은 react.memo 덕분에 1번만 실행됨 */}
    <MemoizedPrimeNosCount max={300} />
    
    <hr />
    
    {/* 이 녀석은 react.memo 덕분에 1번만 실행됨 */}
    <MemoizedPrimeNosCount max={1000000} />
    
    <hr />
    
    <button onClick={() => setNo(no + 1)}>버튼 : {no}</button>
    
    <hr />
    
    {/* 이 녀석은 no가 변할 때 마다 실행됨 (버튼을 누를 때마다) */}
    {/* 왜냐하면 no가 max라는 입력값으로 연결되기 때문에 */}
    {/* React.memo 라도 입력값이 달라지면 속도향상을 이룰 수 없다. */}
    <MemoizedPrimeNosCount max={no} />
  </>;
}

ReactDOM.render(<App />, document.getElementById("root"));
