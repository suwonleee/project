//챕터 72, 5강, Promise객체 생성, reject는 then을 실행하고, reject는 catch를 실행한다.
//https://codepen.io/suwonleee/pen/xxarjwZ

//! Promise 객체 new Promise
// promise 함수를 발행하면 그 함수는 즉시 실행된다.
const myFirstPromise = new Promise((resolve, reject) => {
  reject(new Error("404")); //catch 가 실행된다.
  resolve(10);  //then이 실행된다.
  //resolve 와 reject 둘 다 동시에 실행되지 않는다.
});

// resolve 하게되면 then
myFirstPromise.then((data) => {
  console.log("성공");
  console.log(data);
});

// reject 하게되면 catch
myFirstPromise.catch((err) => {
  console.log("실패");
  console.log(err.message);
});
