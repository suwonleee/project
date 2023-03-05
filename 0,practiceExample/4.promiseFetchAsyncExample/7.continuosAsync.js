//챕터 72, 8강, 이름있는 비동기 함수들을의 연속실행에 Promise를 도입하여 구조개선
//https://codepen.io/suwonleee/pen/QWVgxOE?editors=0011

// 비동기
function _async() {
  console.log("== 비동기방식 시작 ==");

  new Promise((resolve, reject) => {
    console.log("a 실행됨");

    setTimeout(() => {
      resolve(10);
    }, 3000);
  })
    .then((data) => {
      console.log("b 실행됨");

      // 그 다음에도 promise를 활용하고 싶다면 return 문 안에 이렇게 기입.
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(data + 10);
        }, 3000);
      });
    })
    .then((data) => {
      console.log("c 실행됨");

      console.log("최종 : " + data);
    });

  console.log("== 비동기방식 끝 ==");
}

_async();

// "== 비동기방식 시작 =="
// "a 실행됨"
// "== 비동기방식 끝 =="
// ( 3초 뒤에 )

// "b 실행됨"
// ( 3초 뒤에 )
// "c 실행됨"
// "최종 : 20"