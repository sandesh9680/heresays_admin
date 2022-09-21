import { useState, useEffect } from "react";
import RichEditor from "../../components/editor/editor";
import {
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
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
import { Label } from "recharts";
import { CardGroup, Form } from "react-bootstrap";
import { DATA_GRID_PROPS_DEFAULT_VALUES } from "@mui/x-data-grid";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const EditUsers = ({ inputs, titleProps, text, name }) => {
  const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));
  const [file, setFile] = useState("");
  const location = useLocation();
  const [NewNamePost, setNewNamePost] = useState("");
  const [ReferrenceId, setReferrenceId] = useState(false);
  const [editorRef, setEditorRef] = useState("");
  const [textData, setTextData] = useState("");
  const [defaultValue, setDefaultValue] = useState({});
  const [allData, setAllData] = useState();
  const [publishStatus, setPublishStatus] = useState("");
  const [disable, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [saveAction, setSaveAction] = useState(true);
  const [topicName, setTopicName] = useState("");
  const [userAccess, setUserAccess] = useState("");
  const [isShowPassword, setShowPassword] = useState(false);
  const [isShowResetPassword, setShowResetPassword] = useState(false);
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
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (params.id) {
      getdata();
    }
  }, []);
  let allUserAccess = [
    "banner_access",
    "bookpage_access",
    "classified_access",
    "advertisement_access",
    "liststory_access",
    "attentionmodel_access",
    "chatroom_access",
    "disclaimer_access",
    "social_access",
    "termsandcondition_access",
    "manual_access",
    "feedback_access",
  ];

  const onTextDAtaInputChange = (e) => {
    setTopicName(e.target.value);
  };
  const onRoleChange = (e) => {
    if (e.target.value === 1) {
      {
        allUserAccess.map((x) => {
          setValue(x === true);
        });
      }
    }
  };
  const getdata = () => {
    axios.get(`${ApiUrl}getUserById/${params.id}`).then((res) => {
      let requiredData = res.data.list;
      setDefaultValue(requiredData);
      setTextData(requiredData.topic_details);
      setAllData(requiredData);
      reset({
        firstname: requiredData.firstname,
        lastname: requiredData.lastname,
        email: requiredData.email,
        username: requiredData.username,
        // is_active: requiredData.is_active,
        user_role: requiredData.user_role,
        banner_access: requiredData.banner_access === 1 ? true : false,
        bookpage_access: requiredData.bookpage_access,
        classified_access: requiredData.classified_access,
        advertisement_access:
          requiredData.advertisement_access === 1 ? true : false,
        liststory_access: requiredData.liststory_access,
        attentionmodel_access: requiredData.attentionmodel_access,
        chatroom_access: requiredData.chatroom_access,
        disclaimer_access: requiredData.disclaimer_access,
        social_access: requiredData.social_access,
        termsandcondition_access: requiredData.termsandcondition_access,
        manual_access: requiredData.manual_access,
        feedback_access: requiredData.feedback_access,
      });
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
  const showPassword = () => {
    var x = document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  const showResetPassword = () => {
    var x = document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  const onSubmit = async (data) => {
    let allData = { ...data };
    setIsLoading(true);
    if (params.op == "add") {
      if(data.password===data.confirmpassword){
        axios
        .post(`${ApiUrl}signup`, allData)
        .then((res) => {
          console.log("res", res.data);
          alert("User Created Successfully")
          navigate("/app/listUsers");
          setSaveAction(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("errrrr", err.response.data.msg);
          alert(err.response.data.msg);
          setIsLoading(false);
        });
      }
      else{
        alert("Password Doesn't match with Confirm Password")
      }
      
    } else {
      if(data.password===data.confirmpassword){
      axios
        .put(`${ApiUrl}updateuser/${params.id}`, allData)
        .then((res) => {
          alert("User Data Updated Successfully")
          navigate("/app/listUsers");
          getdata();
          setSaveAction(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
          setIsLoading(false);
        });
      }
      else{
        alert("Password Doesn't match with Confirm Password")
      }
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
  
  console.log("datastring",allData&&allData.is_active)
  return (
    <div className="new">
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>{titleProps}</h1>
        </div>
       

        <Form onSubmit={handleSubmit(onSubmit)}>
          <SaveButton isDisabled={false} isLoading={isLoading} size={20} />
          <Box sx={{ flexGrow: 1 }}>
            <Grid item container spacing={6}>
              <Grid item xs={10}>
                <Item>
                  <TextField
                    style={{ position: "relative", width: "100%" }}
                   
                    label="First Name"
                    name="firstname"
                    {...register("firstname", { required: true })}
                    multiline
                    rows={1}
                  />
                </Item>
              </Grid>

              <Grid item xs={10}>
                <Item>
                  <TextField
                    style={{ position: "relative", width: "100%" }}
                   
                    label="Last Name"
                    name="lastname"
                    {...register("lastname", { required: true })}
                    multiline
                    rows={1}
                  />
                </Item>
              </Grid>
              <Grid item xs={5}>
                <Item>
                  <TextField
                    style={{ position: "relative", width: "100%" }}
                    label="E-mail"
                    name="email"
                    {...register("email", { required: true })}
                    multiline
                    rows={1}
                  />
                </Item>
              </Grid>
              <Grid item xs={5}>
                <Item>
                  <TextField
                    style={{ position: "relative", width: "100%" }}
                    label="User Name"
                    name="username"
                    {...register("username", { required: true })}
                    multiline
                    rows={1}
                  />
                </Item>
              </Grid>
              <Grid item xs={5}>
                <Item className="d-flex">
                  <input
                    label="Password"
                    name="password"
                    placeholder="Password"
                    multiline
                    rows={1}
                    style={{ height: "50px" }}
                    type={isShowPassword ? "text" : "password"}
                    {...params.op == "add"?
                    {...register("password", {required:true})}
                    :{...register("password")}
                    }
                    className="sc-IIEeM bkQVkE BaseLogin__PasswordInput-sc-1yt6gzv-0 jEcUqL"
                  />
                  <div className="sc-bGWzfD dqKrYM" style={{ height: "50px" }}>
                    <button
                      aria-label="Hide password"
                      type="button"
                      className="sc-fXynhf ldUFTc FieldActionWrapper-sc-1h13jzf-0 fOzlHG"
                      onClick={() => {
                        setShowPassword(!isShowPassword);
                      }}
                      style={{
                        height: "50px",
                        width: "50px",
                        backgroundColor: "white",
                      }}
                    >
                      {isShowPassword ? (
                        <svg
                          width="5em"
                          height="5em"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.2 12a3.2 3.2 0 11-6.399 0 3.2 3.2 0 016.4 0z"
                            fill="#212134"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M18.78 6.103c1.923 1.243 3.64 2.981 4.963 5.027a1.61 1.61 0 01.005 1.738c-1.318 2.063-3.031 3.807-4.954 5.046-2.12 1.364-4.475 2.086-6.81 2.086-2.388 0-4.683-.7-6.816-2.082-1.894-1.225-3.593-2.966-4.914-5.032a1.596 1.596 0 01.032-1.777C1.89 8.811 3.734 7.027 5.77 5.805 7.767 4.608 9.858 4 11.984 4c2.317 0 4.667.728 6.795 2.103zm-9.446 9.888a4.8 4.8 0 105.334-7.982 4.8 4.8 0 00-5.334 7.982z"
                            fill="#212134"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          width="5rem"
                          height="5rem"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.048 6.875L2.103 4.93a1 1 0 111.414-1.415l16.966 16.966a1 1 0 11-1.414 1.415l-2.686-2.686a12.247 12.247 0 01-4.383.788c-3.573 0-6.559-1.425-8.962-3.783a15.842 15.842 0 01-2.116-2.568 11.096 11.096 0 01-.711-1.211 1.145 1.145 0 010-.875c.124-.258.36-.68.711-1.211.58-.876 1.283-1.75 2.116-2.569.326-.32.663-.622 1.01-.906zm10.539 10.539l-1.551-1.551a4.005 4.005 0 01-4.9-4.9L6.584 9.411a6 6 0 008.002 8.002zM7.617 4.787A12.248 12.248 0 0112 3.998c3.572 0 6.559 1.426 8.961 3.783a15.845 15.845 0 012.117 2.569c.351.532.587.954.711 1.211.116.242.115.636 0 .875-.124.257-.36.68-.711 1.211-.58.876-1.283 1.75-2.117 2.568-.325.32-.662.623-1.01.907l-2.536-2.537a6 6 0 00-8.002-8.002L7.617 4.787zm3.347 3.347A4.005 4.005 0 0116 11.998c0 .359-.047.706-.136 1.037l-4.9-4.901z"
                            fill="#212134"
                          ></path>
                        </svg>
                      )}
                    </button>
                  </div>
                </Item>
              </Grid> 

           <Grid item xs={5}>
                <Item className="d-flex">
                  <input
                    id="cnfpass"
                    label="Confirm Password"
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    {...params.op == "add"?
                    {...register("confirmpassword", {required:true})}
                    :{...register("confirmpassword")}
                    }
                    multiline
                    rows={1}
                    style={{ height: "50px" }}
                    type={isShowResetPassword ? "text" : "password"}
                   
                    className="sc-IIEeM bkQVkE BaseLogin__PasswordInput-sc-1yt6gzv-0 jEcUqL"
                  />
                  <div className="sc-bGWzfD dqKrYM" style={{ height: "50px" }}>
                    <button
                      aria-label="Hide password"
                      type="button"
                      className="sc-fXynhf ldUFTc FieldActionWrapper-sc-1h13jzf-0 fOzlHG"
                      onClick={() => {
                        setShowResetPassword(!isShowResetPassword);
                      }}
                      style={{
                        height: "50px",
                        width: "50px",
                        backgroundColor: "white",
                      }}
                    >
                      {isShowResetPassword ? (
                        <svg
                          width="5em"
                          height="5em"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.2 12a3.2 3.2 0 11-6.399 0 3.2 3.2 0 016.4 0z"
                            fill="#212134"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M18.78 6.103c1.923 1.243 3.64 2.981 4.963 5.027a1.61 1.61 0 01.005 1.738c-1.318 2.063-3.031 3.807-4.954 5.046-2.12 1.364-4.475 2.086-6.81 2.086-2.388 0-4.683-.7-6.816-2.082-1.894-1.225-3.593-2.966-4.914-5.032a1.596 1.596 0 01.032-1.777C1.89 8.811 3.734 7.027 5.77 5.805 7.767 4.608 9.858 4 11.984 4c2.317 0 4.667.728 6.795 2.103zm-9.446 9.888a4.8 4.8 0 105.334-7.982 4.8 4.8 0 00-5.334 7.982z"
                            fill="#212134"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          width="5rem"
                          height="5rem"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.048 6.875L2.103 4.93a1 1 0 111.414-1.415l16.966 16.966a1 1 0 11-1.414 1.415l-2.686-2.686a12.247 12.247 0 01-4.383.788c-3.573 0-6.559-1.425-8.962-3.783a15.842 15.842 0 01-2.116-2.568 11.096 11.096 0 01-.711-1.211 1.145 1.145 0 010-.875c.124-.258.36-.68.711-1.211.58-.876 1.283-1.75 2.116-2.569.326-.32.663-.622 1.01-.906zm10.539 10.539l-1.551-1.551a4.005 4.005 0 01-4.9-4.9L6.584 9.411a6 6 0 008.002 8.002zM7.617 4.787A12.248 12.248 0 0112 3.998c3.572 0 6.559 1.426 8.961 3.783a15.845 15.845 0 012.117 2.569c.351.532.587.954.711 1.211.116.242.115.636 0 .875-.124.257-.36.68-.711 1.211-.58.876-1.283 1.75-2.117 2.568-.325.32-.662.623-1.01.907l-2.536-2.537a6 6 0 00-8.002-8.002L7.617 4.787zm3.347 3.347A4.005 4.005 0 0116 11.998c0 .359-.047.706-.136 1.037l-4.9-4.901z"
                            fill="#212134"
                          ></path>
                        </svg>
                      )}
                    </button>
                  </div>
                </Item>
              </Grid>
              {params.op == "add"?"":<p style={{marginLeft:"5%"}}><b style={{color:"red"}}>*</b>If you want to change password please fill Password field and Confirm Password field otherwise leave it blank</p>}
              <Grid item xs={5}>
                <Item>
                
                  <FormControlLabel
                    name="status"
                  
                    control={
                      <Radio
                        value={1}
                        checked={allData&&allData.is_active&&allData.is_active.toString() == "1" ? true : false}
                        {...register("is_active", {
                          required: true,
                          onChange: (e) => {
                            setAllData({
                              ...allData,
                              is_active: e.target.value,
                            });
                          },
                        })}
                      />
                    }
                    label="Activate"
                  />
                  <FormControlLabel
                    name="status"
                   
                    control={
                      <Radio
                        value={0}
                        checked={allData&&allData.is_active&&allData.is_active.toString() == "0" ? true : false}
                        {...register("is_active", {
                          required: true,
                          onChange: (e) => {
                            setAllData({
                              ...allData,
                              is_active: e.target.value,
                            });
                          },
                        })}
                      />
                    }
                    label="Deactivate"
                  />
                </Item>
              </Grid>
              <Grid item xs={5}>
                <Item label="test">
                  <Select
                    label="User Roles"
                    name="user_role"
                    {...register("user_role", {
                      required: true,
                      onChange: (e) => {
                        onRoleChange(e);
                      },
                    })}
                    style={{ position: "relative", width: "100%" }}
                    labelId="users"
                    id="usersrole"
                    defaultValue={"2"}
                    rows={1}
                  >
                    <MenuItem value={"1"}>SuperAdmin</MenuItem>
                    <MenuItem value={"2"}>Editor</MenuItem>
                    <MenuItem value={"3"}>Author</MenuItem>
                  </Select>
                </Item>
              </Grid>

              <Grid item xs={10}>
                <FormGroup>
                  <FormControlLabel
                    control={<Label />}
                    label="Select Access For User"
                  />
                  <Box
                    sx={{ display: "flex", flexDirection: "row" }}
                    className="row"
                  >
                    <div className="col-12">
                      {allUserAccess.map((x) => {
                        return (
                          <FormControlLabel
                            className="col-3"
                            control={
                              <Checkbox
                                className="col-3"
                                {...register(x, {
                                  onChange: (e) => {
                                    setAllData({
                                      ...allData,
                                      [x]: e.target.checked,
                                    });
                                  },
                                })}
                                checked={
                                  allData && allData[x] == 1 ? true : false
                                }
                              />
                            }
                            label={x.toUpperCase().split("_ACCESS")}
                          />
                        );
                      })}
                    </div>
                  </Box>
                </FormGroup>
              </Grid>
            </Grid>
          </Box>
        </Form>
      </div>
    </div>
  );
};
export default EditUsers;
