import axios from "axios"
import { ApiUrl } from "../config/config"

export const getdata =(name)=>{
   return  axios.get(`${ApiUrl}${name}`)
}