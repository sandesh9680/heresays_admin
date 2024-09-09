import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import RouterComponent from "./router";
import Layout from "./pages/layout/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { Buffer } from 'buffer';



function App() {
  const { darkMode } = useContext(DarkModeContext);
  window.Buffer = Buffer;
  function fnBrowserDetect() {
    let userAgent = navigator.userAgent;
    let browserName;
    if (userAgent.match(/OPR\//i)) {
      browserName = "opera";
    } else if (userAgent.match(/edg/i)) {
      browserName = "edge";
    } else if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "firefox";
    } else if (userAgent.match(/safari/i)) {
      browserName = "safari";
    } else {
      browserName = "No browser detection";
    }
    localStorage.setItem("browserName", JSON.stringify(browserName));
  }
  fnBrowserDetect();

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <RouterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
