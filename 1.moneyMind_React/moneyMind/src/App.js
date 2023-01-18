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

function App() {
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <div className="flex-1"></div>
          <NavLink
            to="/main"
            className="font-bold select-none self-stretch flex items-center"
          >
            스쿼트 챌린지
          </NavLink>
          <div className="flex-1 self-stretch flex justify-end">
            {location.pathname !== "/history" && (
              <NavLink className="select-none flex items-center" to="/history">
                히스토리
              </NavLink>
            )}
            {location.pathname === "/history" && (
              <NavLink className="select-none flex items-center" to="/main">
                뒤로가기
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
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </>
  );
}

export default App;