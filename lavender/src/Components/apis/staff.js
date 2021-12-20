import axiosServices from "./axiosServices";
import {API_ENDPOINT} from "../../Common/constants/index";
import {refreshToken} from "../service/refreshtoken";
    
export const addStaff=async (fd, progress, token, refreshtoken)=>{
    var newtoken = undefined;
    var connect = await axiosServices
    .post(`${API_ENDPOINT}/them-nhanvien`
      ,
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
      .post(`${API_ENDPOINT}/them-nhanvien`, fd,
       {
        headers: { Authorization: `Bearer ${token}` }
        ,
        onUploadProgress: progressEvent=>{
            progress(progressEvent.loaded/progressEvent.total*100);
           }
      });
    }
    return connect;
};

export const editStaff=async (fd, progress, token, refreshtoken)=>{
    var newtoken = undefined;
    var connect = await axiosServices
    .post(`${API_ENDPOINT}/sua-nhanvien`, fd,
      
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
      .post(`${API_ENDPOINT}/sua-nhanvien`, fd,
       {
        headers: { Authorization: `Bearer ${token}` }
        ,
        onUploadProgress: progressEvent=>{
            progress(progressEvent.loaded/progressEvent.total*100);
           }
      });
    }
    return connect;
};

export const allStaff=async(token, refreshtoken)=>{
    var newtoken = undefined;
    var connect = await axiosServices
    .get(`${API_ENDPOINT}/tatca-nhanvien`,
      
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
      .get(`${API_ENDPOINT}/tatca-nhanvien`,
       {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    return connect;
};


export const deleteStaff=async(manhanvien, token, refreshtoken)=>{
    var newtoken = undefined;
    var connect = await axiosServices
    .delete(`${API_ENDPOINT}/xoa-nhanvien?manhanvien=${manhanvien}`,
      
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
      .delete(`${API_ENDPOINT}/xoa-nhanvien?manhanvien=${manhanvien}`,
       {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    return connect;
};