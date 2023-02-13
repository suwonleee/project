// 미션 1 : VS CODE로 스쿼트 앱 구현

import { AppBar, Toolbar } from "@mui/material";
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { NoticeSnackbar } from "./components/NoticeSnackbar";
import History from "./pages/History";
import Main from "./pages/Main";
import ResponsiveAppBar from "./components/Appbar";

function App() {
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <div className="flex-1 self-stretch flex justify-start">
            {location.pathname !== "/appbar" && (
              <NavLink className="select-none flex items-center" to="/appbar">
              {/* to="/history" -> 를 사용해주면 history 페이지로 이동*/}
                앱바 메뉴
              </NavLink>
            )}
            {location.pathname === "/appbar" && (
              <NavLink className="select-none flex items-center" to="/main">
                접기
              </NavLink>
            )}
          </div>
          <NavLink
            to="/main"
            className="font-bold select-none self-stretch flex items-center"
          >
            기계 궁합
          </NavLink>
          <div className="flex-1 self-stretch flex justify-end">
            {location.pathname !== "/history" && (
              <NavLink className="select-none flex items-center" to="/history">
                기록하기
              </NavLink>
            )}
            {location.pathname === "/history" && (
              <NavLink className="select-none flex items-center" to="/main">
                메인으로
              </NavLink>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <NoticeSnackbar />
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/history" element={<History />} />
        <Route path="/appbar" element={<ResponsiveAppBar />} />
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </>
  );
}

export default App;