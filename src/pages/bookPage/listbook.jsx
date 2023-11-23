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
import { ApiUrl } from "../../config/config";


const   ListBookPage = ({routeName}) => {
  const [loadAllBookData, setLoadAllBookData]=useState(false);
  const [isLoading, setIsLoading]=useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [ParamsId, setParamsId] = useState();
  const [publishStatus, setPublishStatus] = useState("");
  

  useEffect(() => {
    loadBookData(0);
    // getdatas()
  }, []);

  const getdatas = (id) => {
    axios.get(`${ApiUrl}getBookById/${id}`).then((res) => {
      let requiredData = res.data.list[0];
      setPublishStatus(requiredData.published_at?"unpublish":'publish')
      let bookData = requiredData.textfield;
      // setDefaultData(bookData);
    });
  };

  function sayHello(data) {
    // let type = publishStatus;
    axios
      .put(`${ApiUrl}updateBookStatus/${data.id}`, {
        type: data.published_at ? "unpublish":"publish",
      })
      .then((res) => {
        setIsLoading(false);
        getdata();
        getdatas(data.id)
        loadBookData(0)
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoading(false);
      });
  }


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
          <div className="cellWithImg" onClick={()=>{setParamsId(params.row.id) ; getdatas(params.row.id)}}>
            { parse(params.row.textfield)}
          </div>
        );
      },
    },

    // {
    //   field: "locale",
    //   headerName: "locale",
    //   width: 100,
    // },
    {
      field: "published_at",
      headerName: "status",
      width: 160,
      renderCell: (params) => {
        return (
          // <div className={`cellWithStatus ${params.row.published_at?"published":"unpublished"}`}>
          //   {params.row.published_at?"published":"unpublished"}
          // </div>
          <div className={`cellWithStatus ${params.row.published_at?"published":"unpublished"}`}>
          {params.row.published_at?"published":"unpublished"}
        </div>
        );
      },
    },


    {
      field: "locale",
      headerName: "Publish/Unpublish",
      width: 160,
      renderCell: (params) => {
        console.log("params" , params.row);
        return (
          <button style={{ backgroundColor:"rgb(0, 119, 255)",color: "white" }} onClick={()=>{getdatas(params.row.id); sayHello(params.row)}}>{params.row.published_at?"unpublish":"publish"}</button>
        );
      },
    },

  ];



  return (
    <>

{/* {ParamsId &&
        <button style={{ marginLeft:"76%",backgroundColor:"rgb(0, 119, 255)",height:"35px",color: "white" }} onClick={sayHello}>{publishStatus=='publish'?'Publish':'Unpublish'}</button>   }  */}

    <ListPage   
    deleteApi='deleteBook'
    columns={userColumns} 
    routeName="/app/bookpage/add" 
    editRouteName="/app/bookpage/edit"
    rowData={loadAllBookData} 
    onPageChange={(pageIndex)=>{loadBookData(pageIndex)}}  
    onClick={(e)=>{console.log("getting id " , e)}}
    isLoading={isLoading}   
    title={"Bookpage"}
    rowCount={itemCount} ></ListPage>
    </>
  )
}

export default ListBookPage;


