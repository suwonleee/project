
import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function SurveyForm (){
  const gridStyles = {
    // backgroundColor: "blue",
    paddingBottom: 1,
    paddingRight: 2,
    marginTop: 12,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 800
  };
  return (
    <>
      <Grid container
      spacing={2}
      rowSpacing={2}
      columnSpacing={5}
      columns={16}
      sx={gridStyles}>
      {/* //! 질문 파트 */}
        <Grid item xs={16} sm={16} sx={{backgroundColor: "white"}}>
          <Box>
            Q. 질문 파트 입니다
          </Box>
        </Grid>
        <Grid item xs={3} sm={3}>
  {/* //! 질문 1번 */}

          <Box align="center">
          <Checkbox
            {...label}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            /><br/>
            1 <br/>전혀 <br/>아니다.
  {/* //! 질문 2번 */}
          </Box>
        </Grid>
        <Grid item xs={3} sm={3}>
          <Box align="center">
          <Checkbox
            {...label}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            /><br/>
            2 <br/> 아니다.
          </Box>
        </Grid>
          {/* //! 질문 3번 */}

        <Grid item xs={3} sm={3}>
          <Box align="center">
          <Checkbox
            {...label}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            /><br/>
            3 <br/> 보통이다.
          </Box>
        </Grid>

          {/* //! 질문 4번 */}
        <Grid item xs={3} sm={3}>
          <Box align="center">
          <Checkbox
            {...label}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            /><br/>
            4 <br/> 그렇다.
          </Box>
        </Grid>

      {/* //! 질문 5번 */}
        <Grid item xs={3} sm={3}>
        
          <Box align="center">
          <Checkbox
            {...label}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            /><br/>
          5 <br/> 매우 <br/>그렇다.
          </Box>
        </Grid>
      </Grid>
      
    </>
  );
}

export default SurveyForm;
