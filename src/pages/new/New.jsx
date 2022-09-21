import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import RichEditor from "../../components/editor/editor";
import { Card, Grid, TextField } from "@mui/material";
import axios from "axios";
import { ApiUrl } from "../../../src/config/config";
import { useNavigate } from "react-router-dom";

const AddNewListStory = ({ inputs, title, text, name }) => {
  const [file, setFile] = useState("");

  const [NewNamePost, setNewNamePost] = useState('');
  const [ReferrenceId, setReferrenceId] = useState(false);
  const [editorRef, setEditorRef] = useState('')
  const navigate = useNavigate()

  const onSubmit = () => {
  axios.post(`${ApiUrl}addBanner`,{
    
      "textfield": text
  
  }).then(res=>{
    axios.put(`${ApiUrl}updateBanner/${res.data.list.insertId}`,{
      data:{ReferrenceId: `HERESAYSBANNER000${res.data.list.insertId}`}
    })
    .then((result)=>{
      navigate('/')
    }).catch((err)=>{
      console.log(err)
    })
  })
  }

const OnTextChange = () => {};
  return (
    <div className="new">
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <TextField
          disabled
          id="outlined-disabled"
          defaultValue="Reference ID"
         style={{display: 'inline-block',left:'1.5%', height: '10%'}}
        />
        <div className="bottom">
          <RichEditor handleUpdate= {OnTextChange}></RichEditor>
        </div>
        <button onClick={(event) => onSubmit(event)}>Submit</button>
        <div>
       
            </div>
      </div>
      
    </div>
    
  );
        
}
export default AddNewListStory;