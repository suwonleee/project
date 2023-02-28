
import React from 'react';
import Grid from '@mui/material/Grid';
import { QuestionAnswer } from "../components/QuestionAnswer";
import { Box } from "@material-ui/core";
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Test (){
  return (
    <>
      <QuestionAnswer
        title="이번에 몇회 하셨나요?"
        answers={["1.전혀 그렇지 않다.", "2.그렇지 않다.", "3.보통이다.", "4.그렇다.", "5.매우 그렇다."]}
      />
      
    </>
  );
}

export default Test;
