import "./new.scss";
import { useEffect, useState } from "react";
import RichEditor from "../../components/editor/editor";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ApiUrl } from "../../config/config";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import SaveButton from "../../components/saveButton/saveButton";

const EditBookPage = ({ inputs, title, text, name }) => {
  const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));
  const [file, setFile] = useState("");
  const location = useLocation();
  const [NewNamePost, setNewNamePost] = useState("");
  const [ReferrenceId, setReferrenceId] = useState(false);
  const [editorRef, setEditorRef] = useState("");
  const [textData, setTextData] = useState("");
  const [defaultData, setDefaultData] = useState("");
  const [publishStatus, setPublishStatus] = useState("");
  const [disable, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [saveAction, setSaveAction] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const language = ["en","ar", "eu", "bn", "nl"];
  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    axios.get(`${ApiUrl}getBookById/${params.id}`).then((res) => {
      let requiredData = res.data.list[0];
      setPublishStatus(requiredData.published_at?"unpublish":'publish')
      let bookData = requiredData.textfield;
      setDefaultData(bookData);
    });
  };

  const getTransLatedTextInsequence = async () => {
    let translatedData = {
      language: "en",
      value: textData,
    };
    
    for (let index = 1; index < language.length; index++) {
      await delay();
      let res = await tranlateText(language[index]);
      translatedData[language[index]]={value:res.data.data.translations[0].translatedText}
    
    }
    return translatedData
  };

  const tranlateText = (lang) => {
    return axios.post(
      "https://translation.googleapis.com/language/translate/v2",
      { text },
      {
        params: {
          q: textData,
          target: lang,
          key: "AIzaSyDJyDB2bnmeDG4KHOZkHnrDqhrqnUI375M",
          format: "text",
        },
      }
    );
  };

  const onSubmit = async () => {
    setIsLoading(true);
    if (params.op == "edit") {
      axios
        .put(`${ApiUrl}updateBook/${params.id}`, {
          label: "test",
          textfield:textData
        })
        .then((res) => {
          getdata();
          setSaveAction(true);
          setIsLoading(false);
          alert("Your Book has been updated successfully")
        })
        .catch((err) => {
          console.log("err", err);
          setIsLoading(false);
        });
    } else {
      axios
        .post(`${ApiUrl}addBook`, {
          label: "test",
          textfield:textData
        })
        .then((res) => {
          navigate("/app/bookpage");
          setSaveAction(true);
          setIsLoading(false);
          alert("Your Book has been added successfully")
        })
        .catch((err) => {
          console.log("err", err);
          setIsLoading(false);
        });
    }
  };
  function sayHello() {
    let type = publishStatus;
    axios
      .put(`${ApiUrl}updateBookStatus/${params.id}`, {
        type: publishStatus,
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
          <h1>{title}</h1>
        </div>
        <div style={{marginTop:"-5%"}}>
        <span>
        {params&&params.op!='add'&&
        <button style={{ marginLeft:"76%",backgroundColor:"rgb(0, 119, 255)",height:"35px",color: "white" }} onClick={sayHello}>{publishStatus=='publish'?'Publish':'Unpublish'}</button>   }     
      <SaveButton isDisabled={saveAction} onSubmit={(event) => onSubmit(event)} isLoading={isLoading} size={20} />
        </span>
     </div>

        <div className="bottom">
          <RichEditor
          editorDefaultText={defaultData && defaultData}
            data={location.state}
            handleUpdate={OnTextChange}
          ></RichEditor>
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default EditBookPage;
