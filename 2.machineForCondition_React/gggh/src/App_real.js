
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
import SurveyForm from "./pages/SurveyForm";
import NotebookList from "./pages/NotebookList";


function App() {
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
          <div className="flex-1 self-stretch flex justify-start">
            {location.pathname !== "/appbar" && (
              <NavLink className="select-none flex items-center" to="/appbar">
              {/* to="/history" -> 를 사용해주면 history 페이지로 이동*/}
                앱바 메뉴
              </NavLink>
            )}
            {location.pathname === "/appbar" && (
              <NavLink className="select-none flex items-center" to="/appbar">
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
            {location.pathname !== "/surveyform" && (
              <NavLink className="select-none flex items-center" to="/surveyform">
                노트북 설문조사
              </NavLink>
            )}
            {location.pathname === "/surveyform" && (
              <NavLink className="select-none flex items-center" to="/appbar">
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
        <Route path="/surveyform" element={<SurveyForm />} />
        <Route path="/notebooklist" element={<NotebookList />} />

        <Route path="*" element={<Navigate to="/appbar" />} />
      </Routes>
    </>
  );
}

export default App_real;
