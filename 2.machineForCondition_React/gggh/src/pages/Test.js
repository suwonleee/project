//! 만약에 한번에 구현하는 것이 가능하다면 components/questionanswers 에서 컴포넌트 받은 후, 여기 test.js가 surveyForm.js 파일을 대체하게 된다.

import React from 'react';
import Grid from '@mui/material/Grid';
import { QuestionAnswer } from "../components/QuestionAnswer";
import { Box } from "@material-ui/core";
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const compList = ("이번에 몇회 하셨나요?","1.전혀 그렇지 않다.", "2.그렇지 않다.", "3.보통이다.", "4.그렇다.", "5.매우 그렇다.")
function Test (compList){
  
  return (
    <>
      <div className="flex-1 flex items-center justify-center">

        {QuestionAnswer("나는 인터넷을 하고 난 뒤 창을 전부 닫는다.","전혀 그렇지 않다.", "그렇지 않다.", "보통이다.", "그렇다.", "매우 그렇다.")}
      </div>
    </>
  );
}

export default Test;
