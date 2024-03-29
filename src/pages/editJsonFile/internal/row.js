import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./row.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Row = ({ langkey, selectedlanguage, values, updateapi }) => {
  const [changedVal, setChangedVal] = useState(values);

  useEffect(() => {
    setChangedVal(values);
  }, [values]);
  const updateValues = (data) => {
    console.log("values in update", langkey, changedVal, selectedlanguage);
    let ApiData = {
      language: selectedlanguage,
      key: langkey,
      value: changedVal,
    };
    axios
      .put("https://api2.heresays.com/api/updateLanguageDataModal", ApiData)
      .then((res) => {
        console.log("updated");
        toastr.success("Updated Successfull");
        updateapi();
      })
      .catch((err) => {
        toastr.error("unSuccessfull");
        console.log("not updated");
      });
  };
  return (
    <div className="edit_content_row">
      <label>{langkey}</label>
      <div className="editform d-flex align-items-center">
        <input
          className="form-control"
          placeholder={changedVal}
          value={changedVal}
          onChange={(e) => {
            setChangedVal(e.target.value);
            //   setLanguageState({
            //     ...languageState,
            //     [key]: languageObj[key],
            //   });
            //   setKey(key);
          }}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            updateValues(langkey, changedVal);
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Row;
