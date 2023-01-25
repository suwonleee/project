// useEffect로 PrimeNosCount 컴포넌트 효율적으로 구현
// ** Q. 1부터 100사이에 / 200사이에/ 300사이에/ {엄청 큰 수}사이에 존재하는 수 세어주기.
// 그런데 -> useEffect로 이미 계산 끝난거 다시 작동 안하게 만들기.


import React, { useState, useEffect } from "https://cdn.skypack.dev/react";
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

function PrimeNosCount({max}) {
  const [count, setCount] = useState(0);
  
  //useEffect로 최댓값 계산한 부분.
  useEffect(() => {
    const count = getPrimeNumbersCount(max);
    setCount(count);
  }, [max]); //max 값이 바뀔 때만 재실행 -> 버튼이 실행되더라도 상관없어진다.
  
  return <div style={{border:'10px solid black', padding:100}}>1부터 {max}사이에 존재하는 소수의 개수는 : {count}개 이다.</div>
}

let AppCallCount = 0;

function App() {
  AppCallCount++;
  console.log(`App이 ${AppCallCount}번 실행됨!`);
  
  const [no, setNo] = useState(0);

  return <>
    <PrimeNosCount max={100} />
    <hr />
    <PrimeNosCount max={200} />
    <hr />
    <PrimeNosCount max={300} />
    <hr />
    <PrimeNosCount max={1000000} />
    <hr />
    <button onClick={() => setNo(no + 1)}>버튼 : {no}</button>
  </>;
}

ReactDOM.render(<App />, document.getElementById("root"));
