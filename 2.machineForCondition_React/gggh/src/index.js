import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./Root";


import {
  BrowserRouter,
  Route,
  Routes,
  // useLocation,
} from "react-router-dom";
import SurveyForm from "./pages/SurveyForm";
import NotebookList from "./pages/NotebookList";
import NotFound from "./pages/NotFound";
import App from "./App";
import Main from "./pages/Main";




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

    <BrowserRouter >
      
      <Root />


      <Routes>
        <Route path="/" element={<App />}>

          <Route path="/surveyform" element={<SurveyForm />} />
          <Route path="/notebooklist" element={<NotebookList/>} />

          <Route path="*" element={<NotFound/>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
    

  </React.StrictMode>
);