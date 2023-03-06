// fetch를 사용해서 외부 데이터 불러오기
//https://codepen.io/suwonleee/pen/zYJzXaB?editors=0012

//fetch를 통해 이미지 데이터를 받아온다.
const promise = fetch("https://picsum.photos/v2/list?page=1&limit=3");

console.log("프로그램 실행");

promise
  .then((data) => {
    console.log(data.ok);
    console.log(data.url);
  })
  .catch((err) => {
    console.log(err.message);
  });

console.log("프로그램 끝");


// "프로그램 실행"
// "프로그램 끝"
// true
// "https://picsum.photos/v2/list?page=1&limit=3"