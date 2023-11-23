import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { FormControl } from "react-bootstrap";
import { Box } from "@mui/system";
import axios from "axios";

import { AllLanguageFromJson } from "../../config/languages";
import "../feedback/list.scss";
import Row from "./internal/row";

const EditJsonFile = () => {
  const [data, setData] = useState();
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [languageList, setLanguageList] = useState([]);
  const [languageObj, setLanguageObj] = useState({});
  const [languageState, setLanguageState] = useState({});
  const [selectedlanguage, setSelectedlanguage] = useState("en");
  const [changedVale, setChangedVal] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    getLanguageList();
  }, []);

  const getLanguageList = () => {
    axios
      .get("https://api.heresays.com/api/languagelist")
      .then((res) => {
        let langObj = res?.data?.list[selectedlanguage];
        setLanguageList(res?.data?.list);
        setLanguageObj(langObj);
        setLanguageState(langObj);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    // console.log("languageList", languageList);
    // setLanguageObj(languageList[selectedlanguage]);
    console.log("languageObj", languageObj);
  }, [languageObj]);

  return (
    <div className="datatable">
      <div className="list">
        <div className="listContainer">
          {/* <Navbar /> */}

          <div className="datatableTitle">
            <Box>
              <InputLabel id="demo-simple-select-label">
                Choose Language
              </InputLabel>
              <Select
                style={{ width: "15vw" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Feedback Type"
                defaultValue={"en"}
                onChange={(e) => {
                  setSelectedlanguage(e.target.value);
                  setLanguageObj(languageList[e.target.value]);
                  setIsFilterApplied(true);
                }}
              >
                {AllLanguageFromJson?.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item?.BCP47}>
                      {item?.Native}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
          </div>

          <div style={{}}>
            {languageObj &&
              Object.keys(languageObj)?.map((key, index) => {
                return (
                  <Row
                    key={key}
                    langkey={key}
                    selectedlanguage={selectedlanguage}
                    values={languageObj[key]}
                    updateapi={getLanguageList}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJsonFile;
