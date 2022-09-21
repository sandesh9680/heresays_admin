import { useState, useEffect } from "react";
import RichEditor from "../../components/editor/editor";
import { Card, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ApiUrl } from "../../config/config";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import SaveButton from "../../components/saveButton/saveButton";
import { useForm } from "react-hook-form";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const EditListPage = ({
  inputs,
  titleProps,
  text,
  name,
  topic_name,
  country,
  language,
  city,
  place,
  topic_details,
  subject_1,
  subject_2,
  subject_3,
  date,
  publisher_name,
  title,
  locale,
}) => {
  const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));
  const [file, setFile] = useState("");
  const location = useLocation();
  const [NewNamePost, setNewNamePost] = useState("");
  const [ReferrenceId, setReferrenceId] = useState(false);
  const [editorRef, setEditorRef] = useState("");
  const [textData, setTextData] = useState("");
  const [defaultValue, setDefaultValue] = useState({});
  const [publishStatus, setPublishStatus] = useState("");
  const [disable, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [saveAction, setSaveAction] = useState(true);
  const [topicName, setTopicName] = useState("");
  const [textDataInput, setTextDataInput] = useState({
    place: "",
    topic_name: "",
  });
  const navigate = useNavigate();
  const params = useParams();
  const languages = ["en", "ar", "eu", "bn", "nl"];
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    getdata();
  }, []);

  const onTextDAtaInputChange = (e) => {
    setTopicName(e.target.value);
  };
  const getdata = () => {
    axios.get(`${ApiUrl}getListStoryById/${params.id}`).then((res) => {
      let requiredData = res.data.list[0];

      setPublishStatus(requiredData.published_at ? "unpublish" : "publish");
      setDefaultValue(requiredData);
      setTextData(requiredData.topic_details);
      reset(requiredData);
    });
  };

  const getTransLatedTextInsequence = async () => {
    let translatedData = {
      language: "en",
      value: textData,
    };

    for (let index = 1; index < languages.length; index++) {
      await delay();
      let res = await tranlateText(languages[index]);
      translatedData[languages[index]] = {
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
    let allData = { ...data, topic_details: textData };
    setIsLoading(true);
    if (params.op == "add") {
      axios
        .post(`${ApiUrl}addListStory`, allData)
        .then((res) => {
          navigate("/app/liststory");
          setSaveAction(true);
          setIsLoading(false);
          alert("Your Story has been added successfully")
        })
        .catch((err) => {
          console.log("err", err);
          setIsLoading(false);
        });
    } else {
      axios
        .put(`${ApiUrl}updateListStory/${params.id}`, allData)
        .then((res) => {
          getdata();
          setSaveAction(true);
          setIsLoading(false);
          alert("Your Story has been updated successfully")
        })
        .catch((err) => {
          console.log("err", err);
          setIsLoading(false);
        });
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  function sayHello() {
    let type = publishStatus;
    axios
      .put(`${ApiUrl}updateListStoryStatus/${params.id}`, {
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
        <div style={{ marginTop: "-4%" }}>
          {params && params.op != "add" && (
            <button
              style={{
                marginLeft: "76%",
                backgroundColor: "rgb(0, 119, 255)",
                height: "35px",
                color: "white",
                position: "absolute",
                right: "14%",
              }}
              onClick={sayHello}
            >
              {publishStatus == "publish" ? "Publish" : "Unpublish"}
            </button>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <SaveButton isDisabled={saveAction} isLoading={isLoading} size={20} />
            <Box sx={{ flexGrow: 1 }}>
              <Grid item container spacing={3}>
                <Grid item xs={10} style={{ marginTop: "2%" }}>
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={
                        defaultValue && defaultValue.topic_name
                          ? defaultValue.topic_name
                          : ""
                      }
                      label="Topic Name"
                      name="topic_name"
                      {...register("topic_name")}
                      multiline
                      rows={4}
                    />
                  </Item>
                </Grid>

                <Grid item xs={3}>
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={defaultValue && defaultValue.country}
                      name="country"
                      {...register("country")}
                      label="country"
                      multiline
                      rows={2}
                    />
                  </Item>
                </Grid>
                <Grid item xs={2}>
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={defaultValue && defaultValue.language}
                      name="language"
                      {...register("language")}
                      label="Language"
                      multiline
                      rows={2}
                    />
                  </Item>
                </Grid>
                <Grid item xs={2}>
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={defaultValue && defaultValue.city}
                      name="city"
                      {...register("city")}
                      label="City"
                      multiline
                      rows={2}
                    />
                  </Item>
                </Grid>
                <Grid item xs={2}>
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={defaultValue && defaultValue.place}
                      name="place"
                      {...register("place")}
                      label="Place"
                      multiline
                      rows={2}
                    />
                  </Item>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid>
                <RichEditor
                  data={location.state}
                  editorDefaultText={defaultValue && defaultValue.topic_details}
                  handleUpdate={OnTextChange}
                  multiline
                  rows={2}
                ></RichEditor>
              </Grid>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={defaultValue && defaultValue.subject_1}
                      name="subject_1"
                      {...register("subject_1")}
                      label="Subject 1"
                      multiline
                      rows={2}
                    />
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={defaultValue && defaultValue.subject_2}
                      name="subject_2"
                      {...register("subject_2")}
                      label="Subject 2"
                      multiline
                      rows={2}
                    />
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={defaultValue && defaultValue.subject_3}
                      name="subject_3"
                      {...register("subject_3")}
                      label="Subject 3"
                      multiline
                      rows={2}
                    />
                  </Item>
                </Grid>

                <Grid item xs={4}>
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={defaultValue && defaultValue.publisher_name}
                      name="publisher_name"
                      {...register("publisher_name")}
                      label="Publisher Name"
                      multiline
                      rows={1}
                    />
                  </Item>
                </Grid>

                <Grid item xs={2}>
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={defaultValue && defaultValue.title}
                      name="title"
                      {...register("title")}
                      label="Title"
                      multiline
                      rows={1}
                    />
                  </Item>
                </Grid>
                <Grid item xs={2}>
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={defaultValue && defaultValue.like}
                      name="like"
                      {...register("like")}
                      disabled
                      label="Like"
                      multiline
                      rows={1}
                    />
                  </Item>
                </Grid>
                <Grid item xs={2}>
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={defaultValue && defaultValue.dislike}
                      name="dislike"
                      {...register("dislike")}
                      disabled
                      label="Dislike"
                      multiline
                      rows={1}
                    />
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={defaultValue && defaultValue.finance}
                      name="finance"
                      {...register("finance")}
                      disabled
                      label="Finance"
                      multiline
                      rows={1}
                    />
                  </Item>
                </Grid>

                <Grid item xs={4}>
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={defaultValue && defaultValue.ok}
                      name="ok"
                      {...register("ok")}
                      disabled
                      label="Ok"
                      multiline
                      rows={1}
                    />
                  </Item>
                </Grid>

                <Grid item xs={4}>
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={defaultValue && defaultValue.liar}
                      name="liar"
                      {...register("liar")}
                      disabled
                      label="Liar"
                      multiline
                      rows={1}
                    />
                  </Item>
                </Grid>

                <Grid item xs={4}>
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={defaultValue && defaultValue.summation - 1}
                      name="summation"
                      {...register("summation")}
                      disabled
                      label="Summation"
                      multiline
                      rows={1}
                    />
                  </Item>
                </Grid>

                <Grid
                  item
                  xs={4}
                  style={{ position: "relative", width: "100%" }}
                >
                  <Item>
                    <TextField
                      style={{ position: "relative", width: "100%" }}
                      defaultValue={defaultValue && defaultValue.reference_id}
                      name="reference_id"
                      {...register("reference_id")}
                      disabled
                      label="Reference"
                      multiline
                      rows={1}
                    />
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditListPage;
