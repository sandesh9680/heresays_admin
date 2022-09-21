import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
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
  editRouteName,
  rowCount,
  isShowIcon = false,
}) => {
  const [pageCountData, setPageCountData] = useState("");
  const [data, setData] = useState(userRows);
  const [newPageData, setNewPageData] = useState(userRows);
  const [show, setShow] = useState(false);
  const [popupData, setPopUpData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    setPopUpData(row)
    setShow(true)};

  const handleDelete = (id) => {
    axios
      .delete(`${ApiUrl}${deleteApi && deleteApi}/${id}`)
      .then((result) => {
        onPageChange(newPageData);
      })
      .catch(() => {});
  };

  const pageCount = () => {
    axios.get(`${ApiUrl}${"getFeedback"}`).then((result) => {
      let pageCount = result.meta;
      setPageCountData(pageCount.totalItems);
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {isShowIcon ? (
              <VisibilityIcon className="icon" onClick={()=>handleShow(params.row)} />
            ) : (
              <Link
                to={{ pathname: `${editRouteName}/${params.row.id}` }}
                state={params.row}
                style={{ textDecoration: "none", color: "black" }}
              >
                <CreateIcon className="icon" />
              </Link>
            )}

          

            <div
              className="deleteButton"
              style={{
                textDecoration: "none",
                color: "black",
                border: "1px solid transparent",
              }}
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon className="icon" />
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>Feedback Type: </h5><h6>{popupData.feedback_type}</h6></Modal.Title>
        </Modal.Header>
        <Modal.Body><h5>Feedback Subject: </h5><h6>{popupData.feedback_subject}</h6></Modal.Body>
        <Modal.Footer>
        <Modal.Body><h5>Feedback Message: </h5><h6>{popupData.feedback_message}</h6></Modal.Body>
        </Modal.Footer>
      </Modal>
      {rows && 
      <DataGrid
        initialState={{
          pagination: {
            pageSize: 5,
          },
          filter:{
            filterModel:{
              items:[]
            }
          }
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
      />}
    </div>
  );
};

export default Datatable;
