//! 나중에 서베이 폼을 아래와 같이 만들어서 기본 페이지 하단에 적용하기
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';


//설문조사 페이지 만들기 https://velog.io/@ramrami-12/React%EB%A1%9C-%EC%84%A4%EB%AC%B8%EC%A1%B0%EC%82%AC-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A7%8C%EB%93%A4%EA%B8%B0

//대화형 설문조사 페이지 https://goddino.tistory.com/182

export function SurveyForm({

  }) {
    return(
      <>
        <Box 
          className="flex justify-center items-center"
                sx={{
                    display: 'flex',
                    mt: '10%'
                }}
        >
            <div
                className="flex justify-center items-center"
                sx={{
                    width: "fit-content"
                }}
            >
                <h1
                    style={{
                        color: "green",
                    }}
                >
                    Checkbox colors
                </h1>
                <strong>React MUI Checkbox API</strong>
                <br />
                <br />
            </div>
            <div
                style={{
                    width: "fit-content",
                    margin: "auto",
                }}
            >
                <Checkbox color='secondary' />
                <Checkbox color='success' />
                <Checkbox color='default' />
                <Checkbox color='primary' />
            </div>
        </Box>
    
      </>
    )
}
export default SurveyForm;