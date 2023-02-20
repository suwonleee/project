// 거슬리는 색상 : #1A80D9 -> 두개가 나오는 메인 화면을 없애야한다. 하나를

import * as React from 'react';
import {
  Outlet,
  NavLink,
    // useLocation,
} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


import {
  BrowserRouter,
  Route,
  Routes,
  // useLocation,
} from "react-router-dom";
import SurveyForm from "./pages/SurveyForm";
import NotebookList from "./pages/NotebookList";
import NotFound from "./pages/NotFound";
import Main from "./pages/Main";

// import { Grid } from '@mui/material';
// import { color } from '@mui/system';
// import AdbIcon from 'img/gggh.png';


let imgSrc = "http://drive.google.com/uc?export=view&id=1nmK1uNuIi8mBqVlyJde8Pf9hymfePUHd"


function App() {
  // const location = useLocation();
  // const pagesKor = ['노트북', '성능', '블로그', '추가1', '추가2'];
  const locationKor = [
    {btName : "노트북", moveTo: "surveyform"},
    {btName : "성능", moveTo: "notebooklist"},
    {btName : "블로그", moveTo: "surveyform"},
    {btName : "추가1", moveTo: "notebooklist"},
  ];
  //영어 페이지를 만든다면
  // const pagesEng = ['Products', 'Pricing', 'Blog'];

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

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
    <>
        <AppBar position="static"  sx={{ height:'100px', boxShadow: 'none' }} >
          <Container maxWidth="lg" >
            <Toolbar disableGutters sx={{ top: '25%'}}>
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
                        display: { xs: 'flex', md: 'none' },
                      }}
                    >
                      {locationKor.map((page) => (
                        <MenuItem key={page.btName} onClick={handleCloseNavMenu}>
                        <NavLink className="select-none flex items-center" to={page.moveTo}>
                          <Typography textAlign="center" >{page.btName}</Typography>

                        </NavLink>
                      </MenuItem>
                      ))}
                    </Menu>
                  </Box>


                  {/* //! 이게 풀스크린 메뉴  */}
                  <Box sx={{  flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                  {locationKor.map((page) => (
                        <MenuItem key={page.btName} onClick={handleCloseNavMenu}>
                        <NavLink className="select-none flex items-center" to={page.moveTo}>
                          <Typography textAlign="center" >{page.btName}</Typography>

                        </NavLink>
                      </MenuItem>
                      ))}
                  </Box>

                  {/* //! 아이콘/텍스트 */}
                  <Box sx={{
                          flexGrow: 0 ,
                          position: 'absolute', 
                          left: '50%', 
                          mt: '110%',
                          transform: 'translate(-50%, -50%)',
                          minWidth: '30%', maxWidth: '110%',
                          display: { xs: 'flex', sm: 'flex' }
                        }}>
                      {/* 로고 */}
                      <Box>
                        <NavLink className="select-none flex items-center" to="/app">
                          <Box sx={{width: { xs: '210%', sm: '150%', md:'110%'}}}>
                            <img src={imgSrc} alt={imgSrc}/>
                          </Box>
                        </NavLink>
                      </Box>
                  </Box>
                  
                  

                  {/* //! 회원 메뉴 풀스크린, 작은 스크린 */}
                  <Box sx={{ flexGrow: 0 , mx: 'auto', position: 'fixed' , top: '3%', right:'5%'}}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                  {/* <Outlet /> */}
            </Toolbar>
          </Container>
        </AppBar>
          <Routes>
            <Route path="/" element={<Main />}>

              <Route path="/surveyform" element={<SurveyForm />} />
              <Route path="/notebooklist" element={<NotebookList/>} />

              <Route path="*" element={<NotFound/>} />
              
            </Route>
          </Routes>
      
    </>
  );
}


export default App;