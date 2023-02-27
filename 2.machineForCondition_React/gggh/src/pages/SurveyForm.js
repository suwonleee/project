
import React from 'react';
import Grid from '@mui/material/Grid';

import { Box } from "@material-ui/core";
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function SurveyForm (){
  const gridStyles = {
    // backgroundColor: "blue",
    paddingBottom: 2,
    paddingRight: 2,
    marginTop: 2,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 800
  };
  return (
    <>
      <Grid container
      spacing={2}
      rowSpacing={12}
      columnSpacing={5}
      columns={16}
      sx={gridStyles}>
        <Grid item xs={16} sm={16} sx={{backgroundColor: "white"}}>
          <Box>
            Q. 질문 파트 입니다
          </Box>
        </Grid>
        <Grid item xs={3} sm={3}>
        
          <Box align="center">
          <Checkbox
            {...label}
            defaultChecked
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
          /><br/>
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

export default SurveyForm;
