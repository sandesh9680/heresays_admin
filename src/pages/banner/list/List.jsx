import "./list.scss";
import parse from 'html-react-parser';
import "../../../components/datatable/datatable.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Datatable from "../../../components/datatable/Datatable";
import { getdata } from "../../../api/getdata";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ListPage from "../../../components/listpage/listPage";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import { ApiUrl } from "../../../config/config";


const ListBanner = ({ routeName}) => {
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [publishStatus, setPublishStatus] = useState("");
  const [defaultData, setDefaultData] = useState("");
  useEffect(() => {
    loaddata(0);
  }, []);

  const getdatas = (id) => {
    axios.get(`${ApiUrl}getBannerById/${id}`).then((res) => {
      let requiredData = res.data.list[0];
      setPublishStatus(requiredData.published_at?"unpublish":'publish')
      let bannerData = requiredData.textfield;
      setDefaultData(bannerData);
    });
  };

  function sayHello(data) {
    let type = publishStatus;
    axios
      .put(`${ApiUrl}updateBannerStatus/${data.id}`, {
        type: data.published_at ? "unpublish":"publish",
      })
      .then((res) => {
        setIsLoading(false);
        getdata();
        loaddata(0);
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoading(false);
      });
  }


 const loaddata = (pageIndex)=>{
   setIsLoading(true)
  getdata(`getBanner?page=${pageIndex+1}`).then((data) => {
    setItemCount(data.data.meta.totalItems);
    setAllData(data.data.data.map((x) => x.attributes))
    setIsLoading(false);
  });
 }
  const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "textfield",
      headerName: "IMAGE",
      width: 460,
      renderCell: (data) => {
          return ReactHtmlParser(data.row.textfield) ;
      },
    },

    // {
    //   field: "locale",
    //   headerName: "locale",
    //   width: 200,
    // },
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
  
    <ListPage 
    columns={userColumns} 
    routeName="/app/addbanner" 
    deleteApi='deleteBanner' 
    editRouteName="/app/editbanner" 
    title={"Banner"}
    rowData={allData} 
    onPageChange={(pageIndex)=>{loaddata(pageIndex)}}  
    isLoading={isLoading}
    rowCount={itemCount}></ListPage>
  );
};

export default ListBanner;
