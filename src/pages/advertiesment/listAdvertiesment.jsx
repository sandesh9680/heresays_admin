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

const ListAdvertiesment = ({routeName}) => {
  const [allData,setAllData]=useState([])
  const [loadAllAdvertiesment,setLoadAllAdvertiesment]=useState(false)
  const [isLoading,setIsLoading]=useState(false)



useEffect(()=>{
  loadAdvertiesmentData(0);
},[]);

const loadAdvertiesmentData= (pageIndex) => {
  setIsLoading(true)
  getdata(`getAdvertisement?page=${pageIndex+1}`).then((data) => {
    setLoadAllAdvertiesment(data.data.data.map((x) => x.attributes))
    setIsLoading(false);
  });
}
const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "label",
      headerName: "Label",
      width: 200,
    },
    {
      field:"description",
      headerName:"Description",
      width:200,
      renderCell: (data) => {
        return ReactHtmlParser(data.row.description) ;
      },
    },
 
    {
      field: "published_at",
      headerName: "Status",
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
    <ListPage deleteApi="deleteAdvertisement"  columns={userColumns} routeName="/app/advertiesment/add" 
    editRouteName="/app/advertiesment/edit"
    rowData={loadAllAdvertiesment} 
    onPageChange={(pageIndex)=>{loadAdvertiesmentData(pageIndex)}}  
    isLoading={isLoading} title={"Advertiesment"} ></ListPage>
  )
}

export default ListAdvertiesment;