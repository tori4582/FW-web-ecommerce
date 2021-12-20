import axiosServices from "./axiosServices";
import {API_ENDPOINT} from "../../Common/constants/index";

const url="/mobile";
   
/* lấy tất cả dữ liệu là mobile*/
export const mobile=()=>{

    return axiosServices.get(API_ENDPOINT+url);
};
export const mobileInfo=(query)=>{
    return axiosServices.get(API_ENDPOINT+query);
};