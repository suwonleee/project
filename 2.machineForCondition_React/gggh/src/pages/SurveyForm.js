
import React from 'react';
import { Grid, Box } from "@material-ui/core";

export SurveyForm (){
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box bgcolor="primary.main" color="info.contrastText" p={2}>
            1
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box bgcolor="warning.main" color="info.contrastText" p={2}>
            2
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box bgcolor="warning.main" color="info.contrastText" p={2}>
            3
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
