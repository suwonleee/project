// fetch를 통해 불러온 데이터를 json화 하기
//https://codepen.io/suwonleee/pen/qBMjwzP?editors=0012
console.log("프로그램 실행");

// limit=2 를 지정하여 사진 최대 두장을 가져오기
fetch("https://picsum.photos/v2/list?page=1&limit=2")
  // ! 가져온 데이터를 json화 해서 나타내기
  .then((data) => data.json())
  .then((data) => {
    console.log(data);
    console.log(data[0]["author"]);
  })
  .catch((err) => {
    console.log(err.message);
  });

console.log("프로그램 끝");


// "프로그램 실행"
// "프로그램 끝"
// [object Array] (2)
// [// [object Object] 
// {↔},// [object Object] 
// {↔}]
// "Alejandro Escamilla"