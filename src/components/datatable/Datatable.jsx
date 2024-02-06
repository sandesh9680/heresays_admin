import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { ApiUrl } from "../../config/config";
import { Button, Modal } from "react-bootstrap";

const Datatable = ({
  rows,
  userColumns,
  userRows,
  columns,
  onPageChange,
  isloading,
  deleteApi,
  deleteDisableApi,
  editRouteName,
  rowCount,
  isDisable,
  isEnable,
  hideEdit,
  isFilterRequired,
  isShowIcon = false,
}) => {
  const [pageCountData, setPageCountData] = useState("");
  const [data, setData] = useState(userRows);
  const [newPageData, setNewPageData] = useState(userRows);
  const [show, setShow] = useState(false);
  const [popupData, setPopUpData] = useState({});
  const [paramsID, setParamsID] = useState();
  const [sepcificStory, setSpecificStory] = useState();
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [enableWarning, setEnableWarning] = useState(false);
  const [disableWarning, setDisableWarning] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [enableData, setEnableData] = useState();
  const [disableData, setDisableData] = useState();
  const [textAreaContent, setTextAreaContent] = useState();
  const [deleteImagePopup, setDeleteImagePopup] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseWarning = () => setDeleteWarning(false);
  const handleCloseImagePopup = () => setDeleteImagePopup(false);
  const handleCloseWarningEnable = () => setEnableWarning(false);
  const handleCloseWarningDisable = () => setDisableWarning(false);
  const handleShow = (row) => {
    console.log("row listarea", row, row?.id);
    // setParamsID(row?.feedback_message?.split(" ")[0]);
    setParamsID(row?.id);
    setPopUpData(row);
    setShow(true);
  };

  const showWarningPopup = (id) => {
    setDeleteWarning(true);
    setDeleteId(id);
  };

  const showEnableWarning = (row) => {
    setEnableData(row);
    setEnableWarning(true);
  };

  const showDisableWarning = (row) => {
    setDisableData(row);
    setDisableWarning(true);
  };

  useEffect(() => {
    setTextAreaContent(sepcificStory?.topic_details);
  }, [sepcificStory]);

  const deleteImage = () => {
    let apiData = {
      book_images: "",
    };
    axios
      .put(`${ApiUrl}updateListStory/${paramsID}`, apiData)
      .then((data) => {
        console.log("data", data);
        onPageChange(newPageData);
        handleCloseImagePopup();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const editPostContent = () => {
    let apiData = {
      topic_details: textAreaContent,
    };
    axios
      .put(`${ApiUrl}updateListStory/${paramsID}`, apiData)
      .then((data) => {
        console.log("data", data);
        onPageChange(newPageData);
        setShow(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleEnable = (data) => {
    setPopUpData(data);
    let apidata = {
      feedback_type: data.feedback_type,
      feedback_subject: data.feedback_subject,
      feedback_message: data.feedback_message,
      feedback_reference: data.feedback_reference,
    };

    axios.post(`${ApiUrl}/addFeedback`, apidata).then((res) => {
      console.log("feedback added again", res);

      axios
        .delete(`${ApiUrl}${deleteDisableApi && deleteDisableApi}/${data.id}`)
        .then((result) => {
          onPageChange(newPageData);
          handleCloseWarningEnable();
          disableColumnFalse(data.feedback_message);
        })
        .catch(() => { });
    });
  };

  const handleDisable = (data) => {
    console.log("disable data", data);
    let apiData = {
      feedback_id: data.id,
      feedback_type: data.feedback_type,
      feedback_subject: data.feedback_subject,
      feedback_message: data.feedback_message,
      feedback_reference: data.feedback_reference,
    };
    axios
      .post(`${ApiUrl}/addFeedbackDisable`, apiData)
      .then((result) => {
        axios
          .delete(`${ApiUrl}${deleteApi && deleteApi}/${data.id}`)
          .then((result) => {
            onPageChange(newPageData);
            handleCloseWarningDisable();
            disableColumnTrue(data.feedback_message);
          })
          .catch(() => { });
      })
      .catch(() => { });
  };

  const disableColumnTrue = (data) => {
    let apiData = {
      isDisable: 1,
    };
    const firstID = data?.split(" ")[0];
    console.log("firstfirst", firstID);
    axios
      .put(`${ApiUrl}updateListStory/${firstID}`, apiData)
      .then((data) => {
        console.log("disable", data);
        // onPageChange(newPageData);
        // setShow(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const disableColumnFalse = (id) => {
    console.log("ididid", id);
    let apiData = {
      isDisable: 0,
    };
    const firstID = id?.split(" ")[0];
    console.log("firstfirst", firstID);

    axios
      .put(`${ApiUrl}updateListStory/${firstID}`, apiData)
      .then((data) => {
        // console.log("data", data);
        // onPageChange(newPageData);
        // setShow(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${ApiUrl}${deleteApi && deleteApi}/${deleteId}`)
      .then((result) => {
        onPageChange(newPageData);
        handleCloseWarning();
      })
      .catch(() => { });
  };

  const pageCount = () => {
    axios.get(`${ApiUrl}${"getFeedback"}`).then((result) => {
      let pageCount = result.meta;
      setPageCountData(pageCount.totalItems);
    });
  };

  useEffect(() => {
    axios.get(`${ApiUrl}getListStoryById/${paramsID}`).then((result) => {
      console.log("setSpecificStory", result);
      setSpecificStory(result?.data?.list[0]);
    });
  }, [paramsID]);

  const removeFirstWord = (str) => {
    if (str) {
      const indexOfSpace = str.indexOf(" ");

      if (indexOfSpace === -1) {
        return "";
      }

      return str.substring(indexOfSpace + 1);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 140,
      cellClassName: "removeborder",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {isShowIcon ? (
              <VisibilityIcon
                className="icon"
                onClick={() => handleShow(params.row)}
              />
            ) : hideEdit ? null : (
              <Link
                to={{ pathname: `${editRouteName}/${params.row.id}` }}
                state={params.row}
                style={{ textDecoration: "none", color: "black" }}
              >
                <CreateIcon className="icon" />
              </Link>
            )}
            {isShowIcon ? (
              <div
                className="deleteButton"
                style={{
                  textDecoration: "none",
                  color: "black",
                  border: "1px solid transparent",
                }}
                // onClick={() => handleDelete(params.row.id)}
                onClick={() => showWarningPopup(params.row.id)}
              >
                <DeleteIcon className="icon" />
              </div>
            ) : null}

            {isDisable ? (
              <div
                className="deleteButton"
                style={{
                  textDecoration: "none",
                  color: "black",
                  border: "1px solid transparent",
                }}
                // onClick={() => handleDisable(params.row)}
                onClick={() => showDisableWarning(params.row)}
              >
                <VisibilityOffIcon className="icon" />
              </div>
            ) : null}

            {isEnable ? (
              <div
                className="deleteButton"
                style={{
                  textDecoration: "none",
                  color: "black",
                  border: "1px solid transparent",
                }}
                // onClick={() => handleEnable(params.row)}
                onClick={() => showEnableWarning(params.row)}
              >
                <button className="success" style={{ backgroundColor: "grey" }}>
                  Enable
                </button>
                {/* <VisibilityIcon className="icon" /> */}
              </div>
            ) : null}
          </div>
        );
      },
    },
    // {
    //   field: "publish",
    //   headerName: "Publish",
    //   width: 180,
    //   renderCell: (params) => {
    //     return (
    //       <div className="cellAction">
    //         <div
    //           className="deleteButton"
    //           style={{
    //             textDecoration: "none",
    //             color: "black",
    //             border: "1px solid transparent",
    //           }}
    //           onClick={() => handleDelete(params.row.id)}
    //         >
    //           <h6>UnPublish</h6>
    //           {/* <DeleteIcon className="icon" /> */}
    //         </div>
    //         <div
    //           className="deleteButton"
    //           style={{
    //             textDecoration: "none",
    //             color: "black",
    //             border: "1px solid transparent",
    //           }}
    //           onClick={() => handleDelete(params.row.id)}
    //         >
    //           <h6>Publish</h6>
    //           {/* <DeleteIcon className="icon" /> */}
    //         </div>
    //       </div>
    //     );
    //   },
    // },
  ];
  return (
    <div className="datatable">
      <Modal show={disableWarning} onHide={handleCloseWarningDisable}>
        {/* <Modal.Header closeButton>
          <Modal.Title>
            <h5>Feedback Type: </h5>
            <h6>{popupData.feedback_type}</h6>
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <h6>Are You Sure You Want to Disable it</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleDisable(disableData);
            }}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseWarningDisable}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={enableWarning} onHide={handleCloseWarningEnable}>
        {/* <Modal.Header closeButton>
          <Modal.Title>
            <h5>Feedback Type: </h5>
            <h6>{popupData.feedback_type}</h6>
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <h6>Are You Sure You Want to Enable it</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleEnable(enableData);
            }}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseWarningEnable}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deleteWarning} onHide={handleCloseWarning}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Feedback Type: </h5>
            <h6>{popupData.feedback_type}</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Are You Sure You Want to Delete data with ID : {deleteId}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleDelete();
            }}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseWarning}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deleteImagePopup} onHide={handleCloseImagePopup}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h6>Are You Sure You Want to Delete Image</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              deleteImage();
            }}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseImagePopup}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Feedback Type: </h5>
            <h6>{popupData.feedback_type}</h6>
          </Modal.Title>
        </Modal.Header>
        {sepcificStory?.topic_name ? (
          <Modal.Body>
            <h5>Feedback Posts Content: </h5>
            <h6>{popupData.feedback_subject}</h6>
            <p>Topic Name : {sepcificStory?.topic_name}</p>
            {sepcificStory?.book_images ? (
              <>
                <p>
                  <a
                    href={`https://heresays.com/storylist2/readstorybook/${paramsID}`}
                  >
                    <img
                      style={{ width: "100px", height: "80px" }}
                      src={sepcificStory?.book_images}
                      alt="img"
                    />
                  </a>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setDeleteImagePopup(true);
                    }}
                  >
                    Delete
                  </Button>
                </p>
              </>
            ) : null}
            <p>Publish By : {sepcificStory?.publisher_name}</p>
            <p className="">
              <textarea
                style={{ width: "100%", height: "100px" }}
                defaultValue={textAreaContent}
                value={textAreaContent}
                onChange={(e) => {
                  setTextAreaContent(e.target.value);
                }}
                type="text"
                name=""
                id=""
              />
              <Button
                variant="success"
                onClick={() => {
                  editPostContent();
                }}
              >
                Update
              </Button>
              {/* {sepcificStory?.topic_details} */}
            </p>
          </Modal.Body>
        ) : null}

        <Modal.Footer>
          <Modal.Body>
            <h5>Feedback Message: </h5>
            <h6 className="feedback_message">
              {removeFirstWord(popupData.feedback_message)}
            </h6>
          </Modal.Body>
        </Modal.Footer>
      </Modal>

      {rows && (
        <DataGrid
          initialState={{
            pagination: {
              pageSize: 5,
            },
            filter: {
              filterModel: {
                items: [],
              },
            },
          }}
          pageSize={10}
          className="datagrid"
          paginationMode="server"
          //rowsPerPageOptions={[5, 10, 20]}
          pagination
          rows={rows && rows}
          loading={isloading}
          columns={columns.concat(actionColumn)}
          rowsPerPageOptions={[10]}
          checkboxSelection
          onPageChange={(newPage) => {
            setNewPageData(newPage);
            onPageChange(newPage);
          }}
          rowCount={rowCount}
        />
      )}
    </div>
  );
};

export default Datatable;
