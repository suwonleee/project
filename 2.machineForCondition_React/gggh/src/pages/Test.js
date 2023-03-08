//! 만약에 한번에 구현하는 것이 가능하다면 components/questionanswers 에서 컴포넌트 받은 후, 여기 test.js가 surveyForm.js 파일을 대체하게 된다.

import React from 'react';
import Grid from '@mui/material/Grid';
import { QuestionAnswer } from "../components/QuestionAnswer";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function Test (){
  const compList = ["나는 인터넷을 하고 난 뒤 창을 전부 닫는다.","전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"]
  return (
    <>
      <div className="flex-1 flex items-center justify-center">
        {QuestionAnswer("나는 인터넷을 하고 난 뒤 창을 전부 닫는다.","전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다")}
      </div>
    </>
  );
}

export default Test;
