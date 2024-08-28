import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import RichEditor from "../../components/editor/editor";
import { Card, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ApiUrl } from "../../config/config";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Loader from "../../components/loader/loader";

const AttentionModel = ({ inputs, title, text, name }) => {
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
  const [isLoading, setIsLoading] = useState(false);
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
    axios.get(`${ApiUrl}getAttention`).then((res) => {
      let requiredData = res.data.data.filter((x) => x.id == 10);
      let attentionData = JSON.parse(requiredData[0].attributes.attention);
      setDefaultData(attentionData);
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
      language: "en",
      value: textData,
    };

    for (let index = 1; index < language.length; index++) {
      //const element = array[index];
      await delay();
      let previousValue = defaultData[language[index]];
      let incrementalData = textData.replace(defaultData.en.value, "");
      if (incrementalData.indexOf("<img") > -1) {
        return textData
      }
      let res = await tranlateText(language[index]);


      translatedData[language[index]] = { value: res.data.data.translations[0].translatedText }
      let requiredValue = res.data.data.translations[0].translatedText ? previousValue.value + res.data.data.translations[0].translatedText : '';
      translatedData[language[index]] = { value: requiredValue }
    }
    return translatedData
  };

  const tranlateText = (lang) => {

    return axios.post(
      "https://translation.googleapis.com/language/translate/v2",
      { text },
      {
        params: {
          q: textData.replace(defaultData.en.value, ""),
          target: lang,
          key: "AIzaSyDJyDB2bnmeDG4KHOZkHnrDqhrqnUI375M",
          format: "text",
        },
      }
    );

  };


  const onSubmit = async () => {
    // if (params.op == "add") {
    setIsLoading(true)
    getTransLatedTextInsequence().then((resultText) => {
      axios
        .post(`${ApiUrl}addAttention`, {
          textfield: JSON.stringify(resultText),
        })
        .then((res) => {
          axios
            .put(`${ApiUrl}updateAttention/${res.data.list.insertId}`, {
              data: {
                ReferrenceId: `HERESAYSBANNER000${res.data.list.insertId}`,
              },
            })
            .then((result) => {
              setIsLoading(false)
              navigate("/app/attentionmodel");
            })
            .catch((err) => {
              setIsLoading(true)
              console.log(err);
            });
        });
    })


    // }
  };
  function sayHello() {
    alert('Data Published Successfully!');
  }

  function sayHelloo() {
    alert('Data Saved Successfully !');
  }
  const OnTextChange = (value, editor) => {
    setTextData(value);
  };
  return (
    <div className="new">
      {/* <Sidebar /> */}
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>Attention Model</h1>
        </div>
        <div style={{ marginRight: "5%" }}>
          <span>
            <button style={{ float: 'right', background: "linear-gradient(45deg, #000C66 30%, #0000FF 90%)", height: "35px", color: "red" }} onClick={sayHello}>Publish</button>
            <button style={{ background: "linear-gradient(45deg, #000C66 30%, #0000FF 90%)", height: "35px", marginTop: "81px", color: "white" }} onClick={sayHelloo}>Save</button>
          </span>
          <div className="bottom">
            {/* <div style={{display:"inline-block",top:"18%",position:"absolute"}}>Attention</div> */}
            {
              isLoading ?
                (<Loader isLoading={isLoading}></Loader>) :
                (<RichEditor
                  data={location.state}
                  handleUpdate={OnTextChange}
                ></RichEditor>)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AttentionModel;

