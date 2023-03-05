// 챕터 72, 1강, 동기식 함수의 연속실행
//https://codepen.io/suwonleee/pen/xxarPwB

function a() {
  console.log("a 실행됨");

  return 10;
}

function b(input) {
  console.log("b 실행됨");

  return input + 10;
}

function c(input) {
  console.log("c 실행됨");

  return input + 10;
}

// 결과 a => b => c
//"a 실행됨"
// "b 실행됨"
// "c 실행됨"
// 30

console.log(c(b(a())));
