import "./list.scss"
import parse from 'html-react-parser';
import { getdata } from "../../api/getdata"
import { useEffect, useState } from "react"
import Datatable from "../../components/datatable/Datatable"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { Link } from "react-router-dom";
import ListPage from "../../components/listpage/listPage";

const ListClassified = ({routeName}) => {

  const [allData,setAllData]=useState([])
  const [loadAllClassifiedData,setLoadAllClasssifiedData]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const [itemCount, setItemCount] = useState(0);


useEffect(()=>{
  loadClassifiedData(0);
},[]);


const loadClassifiedData= (pageIndex) => {
  setIsLoading(true)
  getdata(`getClassified?page=${pageIndex+1}`).then((data) => {
    setItemCount(data.data.meta.totalItems);
    setLoadAllClasssifiedData(data.data.data.map((x) => x.attributes))
    setIsLoading(false);
  });
}

const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "textfield",
    headerName:"Image",
    width: 300,
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
    headerName: "Locale",
    width: 80,
  },
  {
    field: "published_at",
    headerName: "Status",
    width: 120,
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
    <ListPage deleteApi="deleteClassified" 
    columns={userColumns} routeName="/app/classified/add" 
    editRouteName="/app/classified/edit"
    rowData={loadAllClassifiedData} 
    onPageChange={(pageIndex)=>{loadClassifiedData(pageIndex)}}  
    isLoading={isLoading} 
    title={"Classified"} 
    rowCount={itemCount}></ListPage>
  )
}

export default ListClassified;