// ! 아직 앱바 적용 안 함. -> 기존 앱바를 없애고 적용할지 
// ! 아이콘을 정 가운데에 하고 싶은데 ! 잘 안된다 ㅜ 해결하기

//내가 원하는 포맷의 material UI app bar
//https://mui.com/material-ui/react-app-bar/

//레퍼런스
//https://www.the14f.com/

//정가운데 맞추기 레퍼런스
// 1분 코딩 : https://studiomeal.com/archives/197
// 공식 문서 : https://mui.com/joy-ui/react-grid/#spacing
//https://mui.com/material-ui/react-bottom-navigation/#fixed-positioning

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import minWidth from '@mui/system';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import { Grid } from '@mui/material';
// import { color } from '@mui/system';
// import AdbIcon from 'img/gggh.png';

let imgSrc = "http://drive.google.com/uc?export=view&id=1yDdBi0pKzpphRQqLEQWPC5ybPBPLfsEY"


const pagesKor = ['노트북', '성능', '블로그', '추가1', '추가2'];
//영어 페이지를 만든다면
// const pagesEng = ['Products', 'Pricing', 'Blog'];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    // 앱바 크기(높이) 지정해주기
    <AppBar position="static" sx={{ height:'80px'}} >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* //! 스몰 메뉴 햄버거 */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ flexGrow: 0,
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pagesKor.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>


          {/* //! 이게 풀스크린 메뉴  */}
          <Box sx={{  flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {pagesKor.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'inherit', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* // ! 풀스크린 아이콘 */}
          {/* 화면 정 가운데에 위치시켜주기 위해서 첫 박스로 감싸주기*/}
          
          {/* 로고
            <Box sx={{ mx: 'auto', width:'6%'}}>
              <img src={imgSrc} alt={imgSrc} />
            </Box> */}
          
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              // 패딩같은 친구 mr
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            라지
          </Typography> */}
          
          

          {/* //! 스몰 아이콘/텍스트 */}
          <Box style={{
                  position: 'absolute', 
                  left: '50%', 
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}>
              {/* 로고 */}
              <Box sx={{ mx: 'auto', mt:'4%', width:'14%', minWidth:'5%'  }}>
                <img src={imgSrc} alt={imgSrc} />
              </Box>
              {/* 텍스트 */}
              {/* <Typography variant='overline' sx={{ position: 'absolute',
                  left: '50%', 
                  top: '130%',
                  transform: 'translate(-50%, -50%)',
                  display: { xs: 'none', sm: 'flex' }
                  }}>
                각자의 상황에 맞는 기계 찾기
              </Typography> */}
          </Box>
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            스몰
          </Typography> */}
          

          {/* //! 회원 메뉴 풀스크린, 작은 스크린 */}
          <Box sx={{ flexGrow: 0 , mx: 'auto', position: 'fixed' , right: 20, display: { xs: 'flex', md: 'block' }}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;