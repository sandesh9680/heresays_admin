import "./list.scss";
import parse from "html-react-parser";

import "../../components/datatable/datatable.scss";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Datatable from "../../components/datatable/Datatable";
import Navbar from "../navbar/Navbar";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { FormControl } from "react-bootstrap";
import { Box } from "@mui/system";

const ListPage = ({
  routeName,
  title,
  hideEdit,
  isEnable,
  columns,
  rowData,
  feedbackFullData,
  onPageChange,
  deleteApi,
  deleteDisableApi,
  editRouteName,
  isLoading,
  rowCount,
  isCreateNew,
  isShowIcon,
  isFilterRequired,
  isDisable,
}) => {
  const [data, setData] = useState(rowData);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  return (
    <div className="datatable">
      <div className="list">
        <div className="listContainer">
          {/* <Navbar /> */}

          <div className="datatableTitle">
            {title}
            {isFilterRequired && (
              <Box>
                <InputLabel id="demo-simple-select-label">
                  Feedback Type
                </InputLabel>
                <Select
                  style={{ width: "15vw" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Feedback Type"
                  onChange={(e) => {
                    setData(
                      feedbackFullData?.filter(
                        (x) => x.feedback_type === e.target.value
                      )
                    );
                    setIsFilterApplied(true);
                  }}
                >
                  <MenuItem value={"Denounce"}>Denounce</MenuItem>
                  <MenuItem value={"Complaint"}>Complaint</MenuItem>
                  <MenuItem value={"Suggestion"}>Suggestion</MenuItem>
                  <MenuItem value={"Remark"}>Remark</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </Box>
            )}
            {!isCreateNew && (
              <Link to={`${routeName}`} className="link">
                + CREATE NEW ENTRY
              </Link>
            )}
          </div>

          <Datatable
            isEnable={isEnable}
            hideEdit={hideEdit}
            isShowIcon={isShowIcon}
            isDisable={isDisable}
            rowCount={rowCount}
            deleteApi={deleteApi && deleteApi}
            deleteDisableApi={deleteDisableApi && deleteDisableApi}
            editRouteName={editRouteName}
            isloading={isLoading}
            onPageChange={(pageIndex) => {
              onPageChange(pageIndex);
            }}
            columns={columns}
            rows={isFilterApplied ? data : rowData}
          />
        </div>
      </div>
    </div>
  );
};

export default ListPage;
