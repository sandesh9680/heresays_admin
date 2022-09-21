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
const ListBanner = ({ routeName}) => {
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const [itemCount, setItemCount] = useState(0);
  useEffect(() => {
    loaddata(0);
  }, []);
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

    {
      field: "locale",
      headerName: "locale",
      width: 200,
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
