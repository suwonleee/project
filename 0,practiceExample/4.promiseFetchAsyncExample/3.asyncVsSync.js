//챕터 72, 4강, 익명함수가 아닌 이름있는 함수를 사용하면 콜백을 안써도, 순차적인 비동기함수 실행이 가능
//https://codepen.io/suwonleee/pen/WNgOzrE?editors=0012
// ! 동기 방식
function sync() {
  console.log("== 동기방식 시작 ==");

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

  const rs1 = a();
  const rs2 = b(rs1);
  const rs3 = c(rs2);

  console.log("최종결과 : " + rs3);

  console.log("== 동기방식 끝 ==");
}

sync();

// ! 비동기 방식
function _async() {
  console.log("== 비동기방식 시작 ==");

  function a() {
    console.log("a 실행됨");

    setTimeout(() => {
      console.log("a 실행 완료");

      const rs = 10;

      b(rs);
    }, 3000);
  }

  function b(input) {
    console.log("b 실행됨");

    setTimeout(() => {
      console.log("b 실행 완료");

      const rs = input + 10;
      c(rs);
    }, 3000);
  }

  function c(input) {
    console.log("c 실행됨");

    setTimeout(() => {
      console.log("c 실행 완료");

      const rs = input + 10;

      console.log("최종결과 : " + rs);
    }, 3000);
  }

  a();

  console.log("== 비동기방식 끝 ==");
}

_async();
