// 미션 1 : VS CODE로 스쿼트 앱 구현
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { NoticeSnackbar } from "./components/NoticeSnackbar";
import History from "./pages/History";
import Main from "./pages/Main";
import ResponsiveAppBar from "./components/Appbar";
import SurveyForm from "./components/SurveyForm";

function App() {

  return (
    <>
      
      <NoticeSnackbar />
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/history" element={<History />} />
        <Route path="/appbar" element={<ResponsiveAppBar />} />
        <Route path="/surveyform" element={<SurveyForm />} />
        <Route path="*" element={<Navigate to="/appbar" />} />
      </Routes>
    </>
  );
}

export default App;