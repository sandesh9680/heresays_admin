import "./list.scss";
import parse from "html-react-parser";
import "../../components/datatable/datatable.scss";
import { getdata } from "../../api/getdata";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiUrl } from "../../config/config";
import Datatable from "../../components/datatable/Datatable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import ListPage from "../../components/listpage/listPage";
import ReactHtmlParser from "react-html-parser";
const ListStory = ({ routeName, title }) => {
  const [loadListStory, setLoadListStory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [publishStatus, setPublishStatus] = useState("");
  const [paramsId, setParamsId] = useState("");
  useEffect(() => {
    listStoryData(0);
  }, []);

  const listStoryData = (pageIndex) => {
    setIsLoading(true);

    getdata(`getListStory?page=${pageIndex + 1}`).then((data) => {
      setItemCount(data.data.meta.totalItems);
      setLoadListStory(data.data.data.map((x) => x.attributes));
      setIsLoading(false);
    });
  };

  function sayHello(param) {
    axios
      .put(`${ApiUrl}updateListStoryStatus/${param.id}`, {
        type: param.row.published_at ? "unpublish" : "publish",
      })
      .then((res) => {
        setIsLoading(false);
        listStoryData(0);
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoading(false);
      });
  }

  const userColumns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "topic_details",
      headerName: "Topic Details",
      width: 300,
      renderCell: (data) => {
        return ReactHtmlParser(data.row.topic_details);
      },
    },
    {
      field: "topic_name",
      headerName: "Topic",
      width: 120,
    },
    {
      field: "publisher_name",
      headerName: "Publisher",
      width: 120,
    },

    // {
    //   field: "locale",
    //   headerName: "Locale",
    //   width: 60,
    // },
    {
      field: "published_at",
      headerName: "Status",
      width: 110,
      renderCell: (params) => {
        return (
          <div
            className={`cellWithStatus ${params.row.published_at ? "published" : "unpublished"
              }`}
          >
            {params.row.published_at ? "published" : "unpublished"}
          </div>
        );
      },
    },
    {
      field: "locale",
      headerName: "Change Status",
      width: 110,
      renderCell: (params) => {
        console.log("params", params)
        return (
          <button
            style={{
              backgroundColor: "rgb(0, 119, 255)",
              color: "white",
            }}
            onClick={() => { sayHello(params) }}

          >
            {params.row.published_at ? "Unpublish" : "Publish"}
          </button>
        );
      },
    },
  ];

  return (
    <ListPage
      deleteApi="deleteListStory"
      isShowIcon={true}
      columns={userColumns}
      routeName="/app/liststory/add"
      editRouteName="/app/liststory/edit"
      rowData={loadListStory}
      onPageChange={(pageIndex) => {
        listStoryData(pageIndex);
      }}
      isLoading={isLoading}
      title={"List Story"}
      rowCount={itemCount}
    ></ListPage>
  );
};

export default ListStory;
