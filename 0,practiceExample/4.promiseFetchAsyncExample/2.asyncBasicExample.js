//챕터 72, 3강, 비동기식에서는 보통 콜백이라는 개념을 통해서 함수들의 실행 순서를 맞춘다.
//https://codepen.io/suwonleee/pen/XWPgzNo?editors=0012

function a(callback) {
  console.log("a 실행됨");

  //3초 후에 b 실행하게 해줘,
  setTimeout(() => {
    console.log("a 실행완료");

    callback(10);
  }, 3000);
}

function b(input) {
  console.log("b 실행됨");

  //다시 3초 후에 실행되게 만들기
  setTimeout(() => {
    console.log("최종결과 : " + (input + 10));
  }, 3000);
}

// b 를 함수 인자로 넣어줌(callback)
a(b);
