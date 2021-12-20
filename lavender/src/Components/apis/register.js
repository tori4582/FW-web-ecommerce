import axiosServices from "./axiosServices";
import {API_ENDPOINT} from "../../Common/constants/index";

const url="/register";
    
export const register=(data)=>{
    return axiosServices.post(API_ENDPOINT+url, data);
};