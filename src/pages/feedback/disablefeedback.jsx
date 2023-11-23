import "./list.scss";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import Datatable from "../../components/datatable/Datatable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { getdata } from "../../api/getdata";
import { Link } from "react-router-dom";
import ListPage from "../../components/listpage/listPage";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import { ApiUrl } from "../../config/config";

const DisableFeedback = ({ routeName }) => {
  const [allData, setAllData] = useState([]);
  const [loadAllUsers, setLoadAllUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [AllFeedbackLookup, setAllFeedbackLookup] = useState();
  const [feedbackFullData, setFeedbackFullData] = useState();

  useEffect(() => {
    loadUsersData(0);
    FeedbackWithoutPagination();
  }, []);

  const removeFirstWord = (str) => {
    if (str) {
      const indexOfSpace = str.indexOf(" ");

      if (indexOfSpace === -1) {
        return "";
      }

      return str.substring(indexOfSpace + 1);
    }
  };

  const loadUsersData = (pageIndex) => {
    setIsLoading(true);
    getdata(`getFeedbackDisable?page=${pageIndex + 1}`).then((data) => {
      console.log("data feedback", data);
      let feedbackLookup = {};
      data.data.data
        .map((x) => x.attributes)
        .forEach((acc, index) => {
          feedbackLookup[acc.feedback_type] = acc.feedback_type;
        });
      setAllFeedbackLookup(feedbackLookup);
      setLoadAllUsers(data.data.data.map((x) => x.attributes));
      setItemCount(data.data.meta.totalItems);
      setIsLoading(false);
    });
  };

  const FeedbackWithoutPagination = () => {
    axios.get(`${ApiUrl}${"getAllFeedbackDisable"}`).then((result) => {
      setFeedbackFullData(result?.data?.list.map((x) => x));
    });
  };

  const userColumns = [
    {
      field: "feedback_id",
      headerName: "Sl. No.",
      width: 60,
    },
    {
      field: "feedback_type",
      headerName: "Feedback Type",
      width: 110,
    },
    // {
    //   field: "feedback_subject",
    //   headerName: "Subject",
    //   width: 230,
    // },
    {
      field: "feedback_message",
      headerName: "Feedback",
      width: 400,
      renderCell: (data) => (
        <h6>{removeFirstWord(data?.row?.feedback_message)}</h6>
      ),
    },
    // {
    //   field: "feedback_message",
    //   headerName: "Action",
    //   width: 400,
    // },
  ];

  return (
    <ListPage
      //   deleteApi="deleteFeedback"
      deleteDisableApi="deleteFeedbackDisable"
      deleteApi="deleteFeedbackDisable"
      columns={userColumns}
      routeName="/app/users/add"
      editRouteName="/app/users/editusers"
      rowData={loadAllUsers}
      feedbackFullData={feedbackFullData}
      onPageChange={(pageIndex) => {
        loadUsersData(pageIndex);
      }}
      isShowIcon={true}
      isCreateNew={true}
      isLoading={isLoading}
      title={"Feedback"}
      rowCount={itemCount}
      //   isFilterRequired={true}
      // isDisable={true}
      isEnable={true}
      hideEdit={true}
    ></ListPage>
  );
};

export default DisableFeedback;
