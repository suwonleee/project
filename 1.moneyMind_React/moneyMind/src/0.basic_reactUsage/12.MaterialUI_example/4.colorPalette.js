//https://codepen.io/suwonleee/pen/QWBXWMK

//! html
// <div> 안녕하세요. </div>

//! css
// div {
//   background-color:var(--mui-primary-main);
//   color:var(--mui-primary-contrastText);
//   padding:10px;
//   font-weight:bold;
//   font-size:4rem;
// }

//! js
const palette = {
  primary: {
    main: "#ff8686",
    contrastText: "#ffffff"
  }
};

const r = document.querySelector(':root');

r.style.setProperty('--mui-primary-main', palette.primary.main);
r.style.setProperty('--mui-primary-contrastText', palette.primary.contrastText);