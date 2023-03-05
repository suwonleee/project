// 챕터 72, 7강, then을 체이닝하면 동기, 비동기 익명함수들을 순차적으로 실행하도록 만들기 쉽다.
//https://codepen.io/suwonleee/pen/wvEeXwL?editors=0011

console.log("프로그램 시작");

// 발행
const myFirstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);

  //reject(new Error("404"));
});

// 구독
myFirstPromise
  .then((data) => {
    console.log("성공 1");
    return data + 10;
  })
  .then((data) => {
    console.log("성공 2");

    // 성공 2번까지 출력하고 그 뒤에 3초 시간 넣고 다른걸 출력하고 싶다면
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data + 10);
      }, 3000);
    });
  })
  .then((data) => {
    console.log("성공 3");
    console.log(data);
  });

//   "프로그램 시작"
// ( 2초 뒤 )
// "성공 1"
// "성공 2"
// ( 3초 뒤 )
// "성공 3"
// 30
