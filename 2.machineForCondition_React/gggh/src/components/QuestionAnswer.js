//! function 을 하나 더 만들어서 ...answer로 되어 있는 애들 answer[0] ~ answer[4] 답변 출력 포맷으로 만들기.
import React from 'react';
import Grid from '@mui/material/Grid';

import { Box } from "@material-ui/core";

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
        <Grid item xs={3} sm={3}>
          <Box align="center">
            1 <br/>전혀 그렇지 않다.
          </Box>
        </Grid>
        <Grid item xs={3} sm={3}>
          <Box align="center">
            2 <br/> 그렇지 않다.
          </Box>
        </Grid>
        <Grid item xs={3} sm={3}>
          <Box align="center">
            3 <br/> 보통이다.
          </Box>
        </Grid>
        <Grid item xs={3} sm={3}>
          <Box align="center">
            4 <br/> 그렇다.
          </Box>
        </Grid>
        <Grid item xs={3} sm={3}>
          <Box align="center">
          5 <br/> 매우 그렇다.
          </Box>
        </Grid>
      </Grid>
      
    </>
  );
}

