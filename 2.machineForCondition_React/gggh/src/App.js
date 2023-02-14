

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


function App() {
  const pagesKor = ['노트북', '성능', '블로그', '추가1', '추가2'];
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

                {/* //! 아이콘/텍스트 */}
                <Box sx={{
                        flexGrow: 0 ,
                        position: 'absolute', 
                        left: '50%', 
                        top: '100%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: '6%', maxWidth: '7%',
                        display: { xs: 'flex', sm: 'flex' }
                      }}>
                    {/* 로고 */}
                    <Box>
                      <Box sx={{width: { xs: '190%', sm: '150%', md:'120%'}}}>
                        <img src={imgSrc} alt={imgSrc}/>
                      </Box>
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
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}


export default App;