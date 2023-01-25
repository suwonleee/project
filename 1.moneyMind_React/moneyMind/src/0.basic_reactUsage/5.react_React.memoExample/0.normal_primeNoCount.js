// 실행이 오래걸리는 PrimeNosCount 컴포넌트 구현
// ** Q. 1부터 100사이에 / 200사이에/ 300사이에/ {엄청 큰 수}사이에 존재하는 수 세어주기.

import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

//소수가 맞는지 확인하는 함수
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
  // 소수를 담아줄 빈 리스트
  const primeNumbers = [];
  
  // isPrimeNumber(소수)가 맞다면 리스트에 추가.
  for ( let i = 2; i <= max; i++ ){
    if ( isPrimeNumber(i) ) {
      primeNumbers.push(i);
    }
  }
  
  return primeNumbers;
}

//소수의 총 개수 추가 해주기.
function getPrimeNumbersCount(max) {
  return getPrimeNumbers(max).length;
}

//개수를 문장으로 출력.
function PrimeNosCount({max}) {
  const count = getPrimeNumbersCount(max);
  return <div style={{border:'10px solid black', padding:100}}>1부터 {max}사이에 존재하는 소수의 개수는 : {count}개 이다.</div>
}

let AppCallCount = 0;

function App() {
  //앱 실행 횟수 출력.
  AppCallCount++;
  console.log(`App이 ${AppCallCount}번 실행됨!`);

  return <>
    <PrimeNosCount max={100} />
    <hr />
    <PrimeNosCount max={200} />
    <hr />
    <PrimeNosCount max={300} />
    <hr />
    <PrimeNosCount max={1000000} />
  </>;
}

ReactDOM.render(<App />, document.getElementById("root"));
