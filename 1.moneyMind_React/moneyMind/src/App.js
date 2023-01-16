import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import ListPage from "./pages/ListPage";
import WritePage from "./pages/WritePage";

function App() {
  return (
    <>
      <header className='flex'>
        <NavLink className="font-bold p-5 hover:text-red-500" to="/list">
          리스트
        </NavLink>
        <NavLink className="font-bold p-5 hover:text-red-500" to="/write">
          작성
        </NavLink>
        
      </header>
      <Routes>
        <Route path="/list" element={<ListPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="*" element={<Navigate to="/list" />} />
      </Routes>
    </>
  );
}

export default App;