//! function 을 하나 더 만들어서 ...answer로 되어 있는 애들 answer[0] ~ answer[4] 답변 출력 포맷으로 만들기.
// 여기가 실습창  -> https://codepen.io/suwonleee/pen/bGxeqZM?editors=0011

import React from 'react';
import Grid from '@mui/material/Grid';

import { Box } from "@material-ui/core";
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export function QuestionAnswer (title, ...answers){
  const gridStyles = {
    // backgroundColor: "blue",
    paddingBottom: 2,
    paddingRight: 2,
    marginTop: 2,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 600
  };
  // todo 에러 코드 활용
  const error = [...answers].filter((v) => v).length !== 1;
  
  const answerList = () => {
      return(
        <div>
          {answers.map((element, index) => (
            <Grid item xs={3} sm={3}>
              <Box align="center">
              <Checkbox
                {...label}
                defaultChecked
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              /><br/>
                {index} <br/> {element}.
              </Box>
            </Grid>
          ))}
        </div>
      )
    }
  return (
    <>
    {/* 질문지 큰 틀을 설정해주기 */}
      <Grid container
      spacing={2}
      rowSpacing={12}
      columnSpacing={5}
      columns={16}
      sx={gridStyles}>
      {/* 질문의 제목 부분  */}
        <Grid item xs={16} sm={16} sx={{backgroundColor: "white"}}>
          <Box>
            Q. {title}
          </Box>
        </Grid>
        {/*  //todo 여기에 새로운 function을 넣어서 반복문 돌려줄까? */}
        {/* for (const qst of question) */}
        {/* 리액트 JSX 안 반복문 https://codingbroker.tistory.com/123 */}
        <div>
          {answers.map((sentence, index) => (
            <span key={index}>
              <Grid item xs={3} sm={3}>
          
                <Box align="center">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                  /><br/>
                  {index}. <br/>{sentence}.
                </Box>
              </Grid>
                
                {" / "}
            </span>
          ))}
        </div>
      </Grid>
      
    </>
  );
}

  // todo 이걸 활용해서 결과 창에 넣자.
// function App() {
//   const weekArr = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

//   return (
    // <div>
    //   {weekArr.map((week, index) => (
    //     <span key={index}>
    //       {week}
    //       {" / "}
    //     </span>
    //   ))}
    // </div>
//   );
// }
