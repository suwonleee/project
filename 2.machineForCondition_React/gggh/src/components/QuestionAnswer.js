//! function 을 하나 더 만들어서 ...answer로 되어 있는 애들 answer[0] ~ answer[4] 답변 출력 포맷으로 만들기.
// 여기가 실습창  -> https://codepen.io/suwonleee/pen/bGxeqZM?editors=0011
//도움 될만한 문서 -> https://ko.reactjs.org/docs/conditional-rendering.html

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
  const error = [...answers].filter((v) => v).length !== 1;

  // function App() {
  //   const weekArr = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  
  //   return (
  //     <div>
  //       
  //     </div>
  //   );
  // }
  

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
        {/*  //! 여기에 새로운 functiond을 넣어서 반복문 돌려줄까? */}
        {/* for (const qst of question) */}
      </Grid>
      
    </>
  );
}

