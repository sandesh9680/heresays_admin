import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate=useNavigate()
  const logout =()=>{
    localStorage.clear()
    navigate("/login")
  }

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
        </div>
        <div className="items">
          <div className="item">
          <img onClick={logout} style={{height:"30px", cursor:"pointer"}} 
          src="https://img.icons8.com/offices/30/000000/shutdown.png"/>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Navbar;

