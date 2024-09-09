import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import RichEditor from "../../components/editor/editor";
import { Card, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ApiUrl } from "../../config/config";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { getdata } from "../../api/getdata";
import Loader from "../../components/loader/loader";
import SaveButton from "../../components/saveButton/saveButton";
import { AllLanguageFromJson } from "../../config/languages";
import { Button } from "@mui/material";

const EditAttention = ({ inputs, title, text, name }) => {
  const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));
  const [file, setFile] = useState("");
  const location = useLocation();
  const [NewNamePost, setNewNamePost] = useState("");
  const [ReferrenceId, setReferrenceId] = useState(false);
  const [editorRef, setEditorRef] = useState("");
  const [textData, setTextData] = useState("");
  const [allLanguages, setAllLanguages] = useState([]);
  const [editorLanguage, setEditorLanguage] = useState("en");
  const [defaultData, setDefaultData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [saveAction, setSaveAction] = useState(true);
  const [publishStatus, setPublishStatus] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  // const language = allLanguages.map((x) => x.attributes.code);
  const language = AllLanguageFromJson.map((x) => x.BCP47);
  let requiredTextData = Object.fromEntries(
    Object.entries(defaultData).filter(([key]) => key.includes(editorLanguage))
  )[editorLanguage];
  useEffect(() => {
    // getLanguage();
    getdata();
  }, []);
  const getdata = () => {
    axios.get(`${ApiUrl}getAttention`).then((res) => {
      let requiredData = res.data.data.filter((x) => x.id == 10);
      setPublishStatus(
        requiredData[0].attributes.published_at ? "unpublish" : "publish"
      );
      let attentionData = JSON.parse(
        decodeURIComponent(requiredData[0].attributes.attention)
      );
      setDefaultData(attentionData);
    });
  };

  // const getLanguage = () => {
  //   axios
  //     .get(`${ApiUrl}i18n_locale`)
  //     .then((res) => {
  //       setAllLanguages(res.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const getTransLatedTextInsequence = async () => {
    let translatedData = {
      en: {
        value: textData?.replace(/'/g, ""),
      },
    };



    if (!textData) { return "" };

    for (let index = 1; index < language.length; index++) {
      await delay();
      let previousValue = defaultData && defaultData[language[index]];
      let incrementalData = textData.replace(defaultData && defaultData.en ? defaultData.en.value : "", "");
      if (incrementalData.indexOf("<img") > -1) {
        translatedData[language[index]] = { value: previousValue.value + incrementalData };
      }
      else {
        let res = await tranlateText(language[index]);
        // translatedData[language[index]] = { value: res.data.text }
        let requiredValue = res && res?.data.text ? (previousValue ? previousValue.value : "") + res?.data.text : '';
        translatedData[language[index]] = { value: requiredValue }
      }
    }

    return translatedData;
  };

  const tranlateText = (lang) => {

    let textForTraslate = textData.replace(/'/g, "");
    textForTraslate = textForTraslate.substring(
      defaultData?.en?.value.length + 1,
      textData.length + 1
    );

    if (editorLanguage == "en")
      return axios.post(
        `${ApiUrl}translate`,
        {
          mimeType: "text/html",
          targetLanguageCode: lang,
          // text: textData.replace(defaultData?defaultData.en.value:"", ""),
          text: textForTraslate,
          location: "global",
        }
      )
  };

  const onSave = () => {
    let oldContent = { ...defaultData }
    oldContent[editorLanguage] = { value: textData }
    axios
      .put(`${ApiUrl}updateAttention/10`, {
        description: JSON.stringify(oldContent),
      })
      .then((res) => {
        getdata();
        // setIsLoading(false);
        // setSaveAction(true);
      })
      .catch((error) => {
        console.log("error occured in translation");
        // setIsLoading(false);
      });

  }

  const onSubmit = async () => {
    setIsLoading(true);
    getTransLatedTextInsequence().then((resultText) => {
      axios
        .put(`${ApiUrl}updateAttention/10`, {
          // attention: encodeURIComponent(JSON.stringify(resultText)),
          description: JSON.stringify(resultText),
        })
        .then((res) => {
          getdata();
          setIsLoading(false);
          setSaveAction(true);
        })
        .catch((error) => {
          console.log("error occured in translation");
          setIsLoading(false);
        });
      alert("Data updated Successfully");
    });
  };
  function sayHello(type) {
    setIsLoading(true)
    axios
      .put(`${ApiUrl}updateAttentionStatus/10`, {
        type: type,
      })
      .then((res) => {
        setIsLoading(false);
        getdata();
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoading(false);
      });
  }
  const OnTextChange = (value, editor) => {
    setTextData(value);
    setSaveAction(false);
  };
  return (
    <div className="new">
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1 style={{ marginTop: "20px", marginBottom: "10px" }}>
            Attention Model
          </h1>
        </div>
        <span style={{ marginRight: "5%" }}>
          <button
            style={{
              float: 'right',
              backgroundColor: "rgb(0, 119, 255)",
              height: "35px",
              color: "white",
            }}
            onClick={() => sayHello(publishStatus)}
          >
            {publishStatus}
          </button>
          {editorLanguage === "en" ?
            <Button type="submit" style={{ backgroundColor: "#0077ff", height: "35px", width: "auto", color: "white", float: "right", right: "2%", marginBottom: "-2%" }} onClick={(event) => onSave()} >
              {isLoading ? <Loader size={20} isLoading={isLoading}></Loader> : "Save"}
            </Button>
            : null}
          <SaveButton
            isDisabled={saveAction}
            onSubmit={editorLanguage == "en" ? (event) => onSubmit(event) : (event) => onSave()}
            lang={editorLanguage}
            isLoading={isLoading}
            size={20}
          />
          <div style={{ marginLeft: "4%", float: 'left' }}>
            {/* <select onChange={(e) => setEditorLanguage(e.target.value)}>
            {allLanguages &&
              allLanguages.map((x) => {
                return (
                  <option value={x.attributes.code}>{x.attributes.name}</option>
                );
              })}
          </select> */}
            <select onChange={(e) => setEditorLanguage(e.target.value)}>
              {AllLanguageFromJson &&
                AllLanguageFromJson.map((x) => {
                  return (
                    <option value={x.BCP47}>{x.Native}</option>
                  );
                })}
            </select>
          </div>
        </span>


        <div className="bottom">
          <RichEditor
            data={location.state}
            editorDefaultText={requiredTextData && requiredTextData.value}
            handleUpdate={OnTextChange}
          ></RichEditor>
        </div>

        <div></div>
      </div>
    </div>
  );
};
export default EditAttention;
