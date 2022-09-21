import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import RichEditor from "../../components/editor/editor";
import { Card, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ApiUrl } from "../../config/config";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import SaveButton from "../../components/saveButton/saveButton";

const Disclaimer = ({ inputs, title, text, name }) => {
  const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));
  const [file, setFile] = useState("");
  const location = useLocation();
  const [NewNamePost, setNewNamePost] = useState("");
  const [ReferrenceId, setReferrenceId] = useState(false);
  const [editorRef, setEditorRef] = useState("");
  const [textData, setTextData] = useState("");
  const [allLanguages, setAllLanguages] = useState([]);
  const [editorLanguage, setEditorLanguage] = useState("en");
  const [defaultData, setDefaultData] = useState("");
  const [isLoading, setIsLoading]= useState(false);
  const [saveAction, setSaveAction]= useState(true);
  const [publishStatus, setPublishStatus] = useState('')
  const navigate = useNavigate();
  const params = useParams();
  const language = allLanguages.map((x) => x.attributes.code);
  let requiredTextData = Object.fromEntries(
    Object.entries(defaultData).filter(([key]) => key.includes(editorLanguage))
  )[editorLanguage];
  useEffect(() => {
    getLanguage();
    getdata();
  }, []);
  const getdata = () => {
    axios.get(`${ApiUrl}getDisclaimer`).then((res) => {
      let requiredData = res.data.data.filter((x) => x.id == 2);
      setPublishStatus(requiredData[0].attributes.published_at?"unpublish":'publish')
      let disclaimerData = JSON.parse(unescape(requiredData[0].attributes.description));
      setDefaultData(disclaimerData);
    });
  };
  const getLanguage = () => {
    axios
      .get(`${ApiUrl}i18n_locale`)
      .then((res) => {
        setAllLanguages(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getTransLatedTextInsequence = async () => {
    let translatedData = {
      en: {
        value: textData,
      }

    };

    if(!textData){return ""};
    for (let index = 1; index < language.length; index++) {
      await delay();
      let previousValue = defaultData[language[index]];
      let incrementalData = textData.replace(defaultData &&defaultData.en ?defaultData.en.value:"", "");
      if(incrementalData.indexOf("<img")>-1){
        translatedData[language[index]]= {value: previousValue.value + incrementalData};
      }
      else{
      let res = await tranlateText(language[index]);
      translatedData[language[index]] = { value: res.data.text }
      let requiredValue =  res.data.text?  ( previousValue ? previousValue.value : "") + res.data.text: '';
      translatedData[language[index]] = {value: requiredValue }
      }
    }
    return translatedData
  };

  const tranlateText = (lang) => {
    return axios.post(
      `${ApiUrl}translate`,
      {
     
        mimeType: "text/html",
        targetLanguageCode: lang,
        text: textData.replace(defaultData?defaultData.en.value:"", ""),
        location: "global",
      }
    );

  };


  const onSubmit = async () => {
    setIsLoading(true)
    getTransLatedTextInsequence().then((resultText) => {
      axios
        .put(`${ApiUrl}updateDisclaimer/2`, {
          description:escape(JSON.stringify(resultText)),
          label: "test"
        })
        .then((res) => {
          getdata()
          setSaveAction(true)
          setIsLoading(false)
        }).catch((error)=>{
          console.log(error)
          setIsLoading(false)
        });
        alert("Data updated Successfully");
    });
  };
  const OnTextChange = (value, editor) => {
    setTextData(value);
    setSaveAction(false)
  };
  function sayHello(type) {
    axios
    .put(`${ApiUrl}updateDisclaimerStatus/2`, {
      type: type
      
    })
    .then((res) => {
      setIsLoading(false)
      getdata()
    }).catch((err)=>{
      console.log("err",err)
      setIsLoading(false)

    })
  }

  return (
    <div className="new">
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>Disclaimer</h1>
        </div>
        <span style={{marginTop:"-5%"}}>
       <button style={{ marginLeft:"76%",backgroundColor:"rgb(0, 119, 255)",height:"35px",color: "white" }} onClick={()=>sayHello(publishStatus)}>{publishStatus}</button>        
      <SaveButton isDisabled={saveAction} onSubmit={(event) => onSubmit(event)} isLoading={isLoading} size={20} />
       </span>
        <div style={{ marginLeft: "20px" }}>
          <select onChange={(e) => setEditorLanguage(e.target.value)}>
            {allLanguages &&
              allLanguages.map((x) => {
                return (
                  <option value={x.attributes.code}>{x.attributes.name}</option>
                );
              })}
          </select>
        </div>
        <div className="bottom">
          <RichEditor
            editorDefaultText={requiredTextData && requiredTextData.value}
            data={location.state}
            handleUpdate={OnTextChange}
          ></RichEditor>
        </div>
      
        <div></div>
      </div>
    </div>
  );
};
export default Disclaimer;

