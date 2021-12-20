import axiosServices from "./axiosServices";
import {API_ENDPOINT} from "../../Common/constants/index";
import { refreshToken } from "../service/refreshtoken";
    
export const addSuplier=async(fd, progress, token, refreshtoken)=>{
    var newtoken = undefined;
    var connect = await axiosServices
    .post(`${API_ENDPOINT}/them-nhacungcap`,
      
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
      .post(`${API_ENDPOINT}/them-nhacungcap`,
       {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: progressEvent=>{
            progress(progressEvent.loaded/progressEvent.total*100);
           }
      });
    }
    return connect;

};

export const editSuplier=async(fd, progress, token, refreshtoken)=>{
    var newtoken = undefined;
    var connect = await axiosServices
    .post(`${API_ENDPOINT}/sua-nhacungcap`, fd,
      
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
      .post(`${API_ENDPOINT}/sua-nhacungcap`, fd,
       {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: progressEvent=>{
            progress(progressEvent.loaded/progressEvent.total*100);
           }
      });
    }
    return connect;
};

export const allSuplier=async(token, refreshtoken)=>{
    var newtoken = undefined;
    var connect = await axiosServices
    .get(`${API_ENDPOINT}/tatca-nhacungcap`,
      
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
      .get(`${API_ENDPOINT}/tatca-nhacungcap`,
       {
        headers: { Authorization: `Bearer ${token}` },

      });
    }
    return connect;
};


export const deleteSuplier=async(manhacungcap, token, refreshtoken)=>{
    var newtoken = undefined;
    var connect = await axiosServices
    .delete(`${API_ENDPOINT}/xoa-nhacungcap?manhacungcap=${manhacungcap}`,
      
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
      .delete(`${API_ENDPOINT}/xoa-nhacungcap?manhacungcap=${manhacungcap}`,
       {
        headers: { Authorization: `Bearer ${token}` },

      });
    }
    return connect;
};