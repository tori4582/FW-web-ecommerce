import axiosServices from "./axiosServices";
import {API_ENDPOINT} from "../../Common/constants/index";

const url="/laptop";
   
export const laptop=()=>{
    return axiosServices.get(API_ENDPOINT+url);
};
export const laptopInfo=(query)=>{
    return axiosServices.get(API_ENDPOINT+query);
};