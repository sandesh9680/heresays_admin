import "../../pages/new/new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import RichEditor from "../../components/editor/editor";
import { Card, Grid, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { ApiUrl } from "../../config/config";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import SaveButton from "../../components/saveButton/saveButton";
import { useForm } from "react-hook-form";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const EditAdvertisement = ({ inputs, title, text, name }) => {
  const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));
  const [file, setFile] = useState("");
  const location = useLocation();
  const [NewNamePost, setNewNamePost] = useState("");
  const [ReferrenceId, setReferrenceId] = useState(false);
  const [editorRef, setEditorRef] = useState("");
  const [textData, setTextData] = useState("");
  const [publishStatus, setPublishStatus] = useState("");
  const [defaultData, setDefaultData] = useState("");
  const [disable, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [saveAction, setSaveAction] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const language = ["en", "ar", "eu", "bn", "nl"];

  const {
    label,
    requireddata,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    axios.get(`${ApiUrl}getAdvertisement`).then((res) => {
      let requiredData = res.data.data.filter((x) => x.id == params.id);
      setPublishStatus(
        requiredData[0].attributes.published_at ? "unpublish" : "publish"
      );
      let advertisementData = requiredData[0].attributes;
      setDefaultData(advertisementData);
      reset(defaultData);
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
      translatedData[language[index]] = {
        value: res.data.data.translations[0].translatedText,
      };
    }
    return translatedData;
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

  const onSubmit = async (data) => {
  let allData={...data,description:textData}
    setIsLoading(true);
    if (params.op == "add") {
      axios
      .post(`${ApiUrl}addAdvertisement`, allData)
      .then((res) => {
        navigate("/app/advertiesment");
        setSaveAction(true);
        setIsLoading(false);
        alert("Your Advertisement has been added successfully")
      })
      .catch((err) => {
        setIsLoading(false);
      });
    } else {
      axios
        .put(`${ApiUrl}updateAdvertisement/${params.id}`,
          allData
        )
        .then((res) => {
          getdata();
          setSaveAction(true);
          setIsLoading(false);
          alert("Your Advertisement has been updated successfully")
        })
        .catch((err) => {
          console.log("err", err);
          setIsLoading(false);
        });
    }
  };

  function sayHello(data) {
    let type = publishStatus;
    axios
      .put(`${ApiUrl}updateAdvertisementStatus/${params.id}`, {
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
      {/* <Sidebar /> */}
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div style={{marginTop:"-5%"}}>
        <form  onSubmit={handleSubmit(onSubmit)}>
      
        {params&&params.op!='add'&&
        <button style={{ marginLeft:"76%",backgroundColor:"rgb(0, 119, 255)",height:"35px",color: "white" }} 
        onClick={sayHello}>{publishStatus=='publish'?'Publish':'Unpublish'}</button>   }     
        <SaveButton isDisabled={saveAction}  isLoading={isLoading} size={20} />
        
        <Grid item xs={5} style={{marginTop:"2%"}}>
          <Item>
            <TextField
              style={{ position: "relative", width: "100%" }}
              defaultValue={defaultData && defaultData.label}
              name="label"
              {...register("label")}
              multiline
              rows={1}
            />
          </Item>
        </Grid>
        <div className="bottom">
          <RichEditor
            data={location.state}
            editorDefaultText={defaultData && defaultData.description}
            {...register("description")}
            handleUpdate={OnTextChange}
            multiline
            rows={2}
          ></RichEditor>
        </div>
        </form>
        </div>
      </div>
    </div>
  );
};
export default EditAdvertisement;
