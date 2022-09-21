import {BrowserRouter, Outlet} from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";

import { Grid } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";

const Layout = () => (
  <Grid container>
 
    <Grid item md={2}>
      <Sidebar /> 
    </Grid>    
    <Grid item md={10}>
    <Navbar/>
      <Outlet /> 
    </Grid>     
  </Grid>
);
export default Layout;
