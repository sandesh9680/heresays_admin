import "../../pages/Social/social.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { Button, Card, Container, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ApiUrl } from "../../config/config";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import * as React from "react";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/styles";

const Social = ({ inputs, title, text, name }) => {
  const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));
  const [file, setFile] = useState("");
  const location = useLocation();
  const [NewNamePost, setNewNamePost] = useState("");
  const [ReferrenceId, setReferrenceId] = useState(false);
  const [editorRef, setEditorRef] = useState("");
  const [textData, setTextData] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const language = ["en", "ar", "eu", "bn", "nl"];
  const getTransLatedTextInsequence = async () => {
    let translatedData = {
      language: "en",
      value: textData
    };

    for (let index = 1; index < language.length; index++) {
      await delay();
      let res = await tranlateText(language[index]);
      translatedData[language[index]] = {
        value: res.data.data.translations[0].translatedText
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
          format: "text"
        }
      }
    );
  };

  const onSubmit = async () => {
    if (params.op == "add") {
      getTransLatedTextInsequence().then((resultText) => {
        axios
          .post(`${ApiUrl}addBanner`, {
            textfield: JSON.stringify(resultText)
          })
          .then((res) => {
            axios
              .put(`${ApiUrl}updateBanner/${res.data.list.insertId}`, {
                data: {
                  ReferrenceId: `HERESAYSBANNER000${res.data.list.insertId}`
                }
              })
              .then((result) => {
                navigate("/banner");
              })
              .catch((err) => {
                console.log(err);
              });
          });
      });
    }
  };
  function sayHello() {
    alert("Data Published Successfully!");
  }

  function sayHelloo() {
    alert("Data Saved Successfully !");
  }

  const OnTextChange = (value, editor) => {
    setTextData(value);
  };

  const useStyles = makeStyles({
    root: {
      background: "linear-gradient(45deg, #000C66 30%, #0000FF 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      padding: "0 30px",
      position: "absolute",
      top: "50em",
      right: "45em"
    }
  });

  const classes = useStyles();

  return (
    <div className="new">
      <div className="newContainer">
        {/* <Navbar /> */}
      <Container flex={true}>
      <Grid item sm={12}>
        <Grid mb={4}>
 
          <h2 style={{ color: "rgb(0, 119, 255)" }}>Social</h2>
     
        <span>
          <button
            style={{
              marginLeft: "76%",
              backgroundColor: "rgb(0, 119, 255)",
              height: "35px",
              color: "white"
            }}
            onClick={sayHello}
          >
            Publish
          </button>
          <button
            style={{
              backgroundColor: "rgb(0, 119, 255)",
              height: "35px",
              marginTop: "81px",
              color: "white"
            }}
            onClick={sayHelloo}
          >
            Save
          </button>
        </span>

 
        </Grid>
        <Grid>
        <Card>
            <TextField label={"label"}/>
          </Card>
        </Grid>
      
        </Grid>
      </Container>
      </div>
    </div>
  );
};
export default Social;
