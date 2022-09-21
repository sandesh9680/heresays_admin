import "./list.scss"
import parse from 'html-react-parser';
import { useEffect, useState } from "react"
import Datatable from "../../components/datatable/Datatable"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { getdata } from "../../api/getdata"
import { Link } from "react-router-dom";
import ListPage from "../../components/listpage/listPage";
import ReactHtmlParser from "react-html-parser";

const ListUsers = ({routeName}) => {
  const [allData,setAllData]=useState([])
  const [loadAllUsers,setLoadAllUsers]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const [itemCount, setItemCount] = useState(0);



useEffect(()=>{
  loadUsersData(0);
},[]);

const loadUsersData= (pageIndex) => {
  setIsLoading(true)
  getdata(`getAllUsers?page=${pageIndex+1}`).then((data) => {
    setItemCount(data.data.meta.totalItems);
    setLoadAllUsers(data.data.data.map((x) => x.attributes))
    setIsLoading(false);
  });
}
const userColumns = [
    { field: "firstName",
     headerName: "First Name",
      width: 140,
      renderCell: (data) => {
        return ReactHtmlParser(data.row.firstname) ;
      },
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 140,
      renderCell: (data) => {
        return ReactHtmlParser(data.row.lastname) ;
      },
    },
    {
      field:"email",
      headerName:"E-mail",
      width:140,
      renderCell: (data) => {
        return ReactHtmlParser(data.row.email) ;
      },
    },
 
    {
      field: "role",
      headerName: "Role",
      width: 140,
      renderCell: (data) => {
        if(data.row.user_role==1){
          return ("Super Admin") ;
        }
        else if(data.row.user_role==2){
          return("Editor")
        }
        else if(data.row.user_role==3){
          return("Author")
        }
        
      },
    },

    {
      field:"userName",
      headerName:"User Name",
      width:140,
      renderCell: (data) => {
        return ReactHtmlParser(data.row.username) ;
      },
    },

    {
      field:"userStatus",
      headerName:"User Status",
      width:130,
      renderCell: (data) => {
        if(data.row.is_active==1){
          return ("Active") ;
        }
        else if(data.row.is_active==0){
          return("Inactive")
        }
      },
    },
  ];

  return (
    <ListPage 
    deleteApi="deleteUser"  
    columns={userColumns} 
    routeName="/app/users/add" 
    editRouteName="/app/users/editusers"
    rowData={loadAllUsers} 
    onPageChange={(pageIndex)=>{loadUsersData(pageIndex)}}  
    isLoading={isLoading}
     title={"Users"}
     rowCount={itemCount}
     ></ListPage>
  )
}

export default ListUsers;