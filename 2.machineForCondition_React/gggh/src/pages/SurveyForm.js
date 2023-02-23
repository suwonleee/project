
import React from 'react';
import Grid from '@mui/material/Grid';

import { Box } from "@material-ui/core";

function SurveyForm (){
  const gridStyles = {
    backgroundColor: "blue",
    paddingBottom: 2,
    paddingRight: 2,
    marginTop: 2,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 500
  };
  return (
    <>
      <Grid container container
      spacing={2}
      rowSpacing={2}
      columnSpacing={2}
      columns={16}
      sx={gridStyles}>
        <Grid item xs={12} sm={18} sx={{backgroundColor: "white"}}>
          <Box bgcolor="primary.main" color="info.contrastText" p={2}>
            1
          </Box>
        </Grid>
        
        <Grid item xs={6} sm={3}>
          <Box bgcolor="error.main" color="info.contrastText" p={2}>
            4
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box bgcolor="error.main" color="info.contrastText" p={2}>
            5
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box bgcolor="error.main" color="info.contrastText" p={2}>
            6
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box bgcolor="error.main" color="info.contrastText" p={2}>
            7
          </Box>
        </Grid>
      </Grid>
      
    </>
  );
}

export default SurveyForm;