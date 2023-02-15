//! 나중에 서베이 폼을 아래와 같이 만들어서 기본 페이지 하단에 적용하기
import { Button } from "@mui/material";
import Box from '@mui/material/Box';


//설문조사 페이지 만들기 https://velog.io/@ramrami-12/React%EB%A1%9C-%EC%84%A4%EB%AC%B8%EC%A1%B0%EC%82%AC-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A7%8C%EB%93%A4%EA%B8%B0

//대화형 설문조사 페이지 https://goddino.tistory.com/182

export function NotebookList({
}){
    return(
      <>
        <Box sx={{ bgcolor: 'error.main' , height:'400px',  mt: '20%'}}>
          <Button variant="outlined" sx={{  mt: '0%'}}>
            제대로 구동이 되면 이렇게 출력
          </Button>

        </Box>
      </>
    )
}
export default NotebookList;