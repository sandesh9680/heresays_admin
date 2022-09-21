
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import RouterComponent from './router'
import Layout from "./pages/layout/layout";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
   <BrowserRouter>
       
       <RouterComponent/>

       </BrowserRouter>
    </div>
  );
}

export default App;
