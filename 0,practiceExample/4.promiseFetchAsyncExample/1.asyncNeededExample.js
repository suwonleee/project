// 챕터 72, 2강, 비동기식 함수들은 리턴을 통해서 값을 전달할 수 없다.

function a() {
  console.log("a 실행됨");

  setTimeout(() => {
    console.log("실행됨!");
    return 10;
  }, 1000);
}

// 결과
// "a 실행됨"
// undefined
// "실행됨!"
//! 저 시간초를 기다리지 못해서 undefined 를 출력
const rs = a();

console.log(rs);
