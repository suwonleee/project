//간단한 이미지 로드기능 구현
//https://codepen.io/suwonleee/pen/oNPwRvE

//!html 폼
// form action이 비워져있는 이유는 onsubmit 이 작동하면 자동으로 작동하지 않기 때문
// this 는 form을 지칭 , form 에 this img no가 들어온다.

{/* <form action="" onsubmit="loadImgInfo(this['img-no'].valueAsNumber); return false;">
  input 안에 들어갈 타입, 최대 최소 지정 
  <input name="img-no" placeholder="이미지 번호" type="number" max="100" min="0" value="0">
  <input type="submit" value="정보 불러오기">
</form>

<img src="" alt=""></img> */}

//! css 폼
// img {
//   border: 10px solid red;
//   width: 100%;
// }

// input {
//   font-size: 3rem;
// }

//! js 폼
console.clear();

//form의 this img-no 가 들어오게 된다.
function loadImgInfo(id) {
  fetch(`https://picsum.photos/id/${id}/info`)
    .then((data) => data.json())
    .then((data) => {
      // img 태그의 첫번째(0) 속성이 이미지
      const img = document.getElementsByTagName("img")[0];
      img.src = data.download_url;

      console.log(data);
    });
}
