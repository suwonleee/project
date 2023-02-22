//! 나중에 서베이 폼을 아래와 같이 만들어서 기본 페이지 하단에 적용하기
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/system';


//설문조사 페이지 만들기 https://velog.io/@ramrami-12/React%EB%A1%9C-%EC%84%A4%EB%AC%B8%EC%A1%B0%EC%82%AC-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A7%8C%EB%93%A4%EA%B8%B0

//대화형 설문조사 페이지 https://goddino.tistory.com/182

//체크 폼 예시 페이지 https://refine.dev/blog/material-ui-checkbox-component/

export function SurveyForm({

  }) {
    return(
      <div className="flex-1 flex items-center justify-center" >
        <section className="login">
          <div className="loginContainer">
              <label>Name</label>
              <input 
              type='text'
              autoFocus
              required
              />
              <label>Email</label>
              <input 
              type='text'
              required
              />

              <label>Comment or Message</label>
              <textarea placeholder='Enter comment here'></textarea>

              <h3 style={{background: 'none'}}>Stay connected</h3>
              <FormGroup style={{background: 'none'}}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Sign Up for our Newsletter" />
              </FormGroup>



            
              <div className="btnContainer">
                          <button>Submit</button>
              </div>


              
          </div>
        </section>
      </div>
      
    )
}