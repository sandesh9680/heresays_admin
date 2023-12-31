import { Button } from "@mui/material";
import Loader from "../loader/loader";

const SaveButton = (props) => {
const {onSubmit,isLoading,size=20,isDisabled=true,lang}=props

    return (
        <Button type="submit" disabled={isDisabled} onClick={onSubmit} style={isDisabled? {  backgroundColor:"grey", height:"35px" , width:"auto",color: "black", float:"right", right:"2%", marginBottom:"-2%"}:{  backgroundColor:"#0077ff", height:"35px" , width:"auto",color: "white", float:"right", right:"2%", marginBottom:"-2%"}}>
            {isLoading ? <Loader size={size} isLoading={isLoading}></Loader>:(lang == "en") ? "Translate & Save" : "Save"}
        </Button>
    )
}

export default SaveButton;