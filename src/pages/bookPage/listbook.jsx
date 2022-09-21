import "./list.scss"
import parse from 'html-react-parser';
import { useEffect, useState } from "react"
import Datatable from "../../components/datatable/Datatable"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { getdata } from "../../api/getdata"
import { Link } from "react-router-dom";
import axios from 'axios';
import ListPage from "../../components/listpage/listPage";

const   ListBookPage = ({routeName}) => {
  const [loadAllBookData, setLoadAllBookData]=useState(false);
  const [isLoading, setIsLoading]=useState(false);
  const [itemCount, setItemCount] = useState(0);
  useEffect(() => {
    loadBookData(0);
  }, []);

  const loadBookData= (pageIndex) => {
    setIsLoading(true)
    getdata(`getBook?page=${pageIndex+1}`).then((data) => {
      setItemCount(data.data.meta.totalItems);
      setLoadAllBookData(data.data.data.map((x) => x.attributes))
      setIsLoading(false);
    });
  }
  const userColumns = [
    { field: "id", headerName: "ID", width: 70 },


    {
      field: "textfield",
      headerName: "IMAGE",
      width: 260,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            { parse(params.row.textfield)}
          </div>
        );
      },
    },

    {
      field: "locale",
      headerName: "locale",
      width: 100,
    },
    {
      field: "published_at",
      headerName: "status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.published_at?"published":"unpublished"}`}>
            {params.row.published_at?"published":"unpublished"}
          </div>
        );
      },
    },
  ];



  return (
    <ListPage   
    deleteApi='deleteBook'
    columns={userColumns} 
    routeName="/app/bookpage/add" 
    editRouteName="/app/bookpage/edit"
    rowData={loadAllBookData} 
    onPageChange={(pageIndex)=>{loadBookData(pageIndex)}}  
    isLoading={isLoading}   
    title={"Bookpage"}
    rowCount={itemCount} ></ListPage>
  )
}

export default ListBookPage;


