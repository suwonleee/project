//! 나중에 서베이 폼을 아래와 같이 만들어서 기본 페이지 하단에 적용하기

//설문조사 페이지 만들기 https://velog.io/@ramrami-12/React%EB%A1%9C-%EC%84%A4%EB%AC%B8%EC%A1%B0%EC%82%AC-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A7%8C%EB%93%A4%EA%B8%B0

 //대화형 설문조사 페이지 https://goddino.tistory.com/182



import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
// import { read, utils } from "xlsx";

export default function NotebookList() {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (

    <div className="mt-2 sm:mt-4 shadow rounded-[20px] flex">
      <div className="px-5 hover:text-[color:var(--mui-color-primary-main)] flex-grow flex items-center whitespace-pre-wrap leading-relaxed my-5">
      <Box 
        className="flex justify-center items-center" 
        sx={{ display: 'flex', height: '1000px'
      }}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Assign responsibility</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
              }
              label="Gilad Gray"
            />
            <FormControlLabel
              control={
                <Checkbox checked={jason} onChange={handleChange} name="jason" />
              }
              label="Jason Killian"
            />
            <FormControlLabel
              control={
                <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
              }
              label="Antoine Llorca"
            />
          </FormGroup>
          <FormHelperText>Be careful</FormHelperText>
        </FormControl>
        <FormControl
          required
          error={error}
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
        >
          <FormLabel component="legend">Pick two</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
              }
              label="Gilad Gray"
            />
            <FormControlLabel
              control={
                <Checkbox checked={jason} onChange={handleChange} name="jason" />
              }
              label="Jason Killian"
            />
            <FormControlLabel
              control={
                <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
              }
              label="Antoine Llorca"
            />
          </FormGroup>
          <FormHelperText>You can display an error</FormHelperText>
        </FormControl>
      </Box>
      
      </div>
    </div>
    
  );
}
// export default NotebookList;
