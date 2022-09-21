import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { getdata } from "../../api/getdata"
import { useEffect, useState } from "react"

const List = ({routeName}) => {
  const [allData,setAllData]=useState([])
useEffect(()=>{
  getdata().then((data)=>{console.log(data.data.data);setAllData(data.data.data)})
},[])




  return (
    <div className="list">
      <div className="listContainer">
        <Navbar/>
        <Datatable alldata={allData} />
      </div>
    </div>
  )
}

export default List