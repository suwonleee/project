//챕터 72, 6강, Promise객체는 유튜버이고, then을 통해서 여러명의 구독자를 받을 수 있다.
//https://codepen.io/suwonleee/pen/poOwVNm

//! 
// 유튜버로서 영상을 올리면
const myFirstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);

  //reject(new Error("404"));
});

// 그 영상을 통해서 구독을 여러개 받을 수 있다.
myFirstPromise.then((data) => {
  console.log("성공");
  console.log(data);
});

myFirstPromise.then((data) => {
  console.log("성공");
  console.log(data);
});

//4초 뒤에 성공 + data 출력
setTimeout(() => {
  myFirstPromise.then((data) => {
    console.log("성공");
    console.log(data);
  });
}, 4000);

myFirstPromise.catch((err) => {
  console.log("실패");
  console.log(err.message);
});

// "성공"
// 10
// "성공"
// 10
// ( 4초 뒤에 성공 출력 )
// "성공"
// 10