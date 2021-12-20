import axiosServices from "./axiosServices";
import {API_ENDPOINT} from "../../Common/constants/index";
import { refreshToken } from "../service/refreshtoken";
    
export const addAccount=async(fd, progress, token, refreshtoken)=>{
    var newtoken = undefined;
    var connect = await axiosServices
    .post(`${API_ENDPOINT}/them-taikhoannhanvien`,
      
        {
          headers: { Authorization: `Bearer ${token}` },
          onUploadProgress: progressEvent=>{
            progress(progressEvent.loaded/progressEvent.total*100);
           }
        }
      )
      .catch((error) => {
        if (error.response.status === 401) {
          newtoken = refreshToken(refreshtoken);
          return error;
        }
      });
    if (newtoken !== undefined) {
      return await axiosServices
      .post(`${API_ENDPOINT}/them-taikhoannhanvien`,
       {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: progressEvent=>{
            progress(progressEvent.loaded/progressEvent.total*100);
           }
      });
    }
    return connect;

};

export const editAccount=async(fd, progress, token, refreshtoken)=>{
    var newtoken = undefined;
    var connect = await axiosServices
    .post(`${API_ENDPOINT}/sua-taikhoannhanvien`, fd,
      
        {
          headers: { Authorization: `Bearer ${token}` },
          onUploadProgress: progressEvent=>{
            progress(progressEvent.loaded/progressEvent.total*100);
           }
        }
      )
      .catch((error) => {
        if (error.response.status === 401) {
          newtoken = refreshToken(refreshtoken);
          return error;
        }
      });
    if (newtoken !== undefined) {
      return await axiosServices
      .post(`${API_ENDPOINT}/sua-taikhoannhanvien`, fd,
       {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: progressEvent=>{
            progress(progressEvent.loaded/progressEvent.total*100);
           }
      });
    }
    return connect;
};

export const allAccount=async(token, refreshtoken)=>{
    var newtoken = undefined;
    var connect = await axiosServices
    .get(`${API_ENDPOINT}/tatca-taikhoannhanvien`,
      
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((error) => {
        if (error.response.status === 401) {
          newtoken = refreshToken(refreshtoken);
          return error;
        }
      });
    if (newtoken !== undefined) {
      return await axiosServices
      .get(`${API_ENDPOINT}/tatca-taikhoannhanvien`,
       {
        headers: { Authorization: `Bearer ${token}` },

      });
    }
    return connect;
};


export const deleteAccount=async(manhanvien, token, refreshtoken)=>{
    var newtoken = undefined;
    var connect = await axiosServices
    .delete(`${API_ENDPOINT}/xoa-taikhoannhanvien?manhanvien=${manhanvien}`,
      
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((error) => {
        if (error.response.status === 401) {
          newtoken = refreshToken(refreshtoken);
          return error;
        }
      });
    if (newtoken !== undefined) {
      return await axiosServices
      .delete(`${API_ENDPOINT}/xoa-taikhoannhanvien?manhanvien=${manhanvien}`,
       {
        headers: { Authorization: `Bearer ${token}` },

      });
    }
    return connect;
};