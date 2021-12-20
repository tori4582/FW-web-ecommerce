import axiosServices from "./axiosServices";
import { API_ENDPOINT } from "../../Common/constants/index";
import { refreshToken } from "../service/refreshtoken";

export const trademark = (maloai) => {
  return axiosServices.get(`${API_ENDPOINT}/thuonghieu?loai=${maloai}`);
};
export const findTrademarkIdByName = (tenthuonghieu) => {
  return axiosServices.get(
    `${API_ENDPOINT}/tim-mathuonghieu-bang-tenthuonghieu?tenthuonghieu=${tenthuonghieu}`
  );
};
export const timThuonghieu = (timkiem) => {
  return axiosServices.get(`${API_ENDPOINT}/tim-thuonghieu?timkiem=${timkiem}`);
};

////////////////////////////////////////////////////////////////   
export const addTrademark=async(fd, progress, token, refreshtoken)=>{
  var newtoken = undefined;
  var connect = await axiosServices
  .post(`${API_ENDPOINT}/them-thuonghieu`,
    
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
    .post(`${API_ENDPOINT}/them-thuonghieu`,
     {
      headers: { Authorization: `Bearer ${token}` },
      onUploadProgress: progressEvent=>{
          progress(progressEvent.loaded/progressEvent.total*100);
         }
    });
  }
  return connect;

};

export const editTrademark=async(fd, progress, token, refreshtoken)=>{
  var newtoken = undefined;
  var connect = await axiosServices
  .post(`${API_ENDPOINT}/sua-thuonghieu`, fd,
    
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
    .post(`${API_ENDPOINT}/sua-thuonghieu`, fd,
     {
      headers: { Authorization: `Bearer ${token}` },
      onUploadProgress: progressEvent=>{
          progress(progressEvent.loaded/progressEvent.total*100);
         }
    });
  }
  return connect;
};

export const allTrademark=async(token, refreshtoken)=>{
  var newtoken = undefined;
  var connect = await axiosServices
  .get(`${API_ENDPOINT}/tatca-thuonghieu`,
    
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
    .get(`${API_ENDPOINT}/tatca-thuonghieu`,
     {
      headers: { Authorization: `Bearer ${token}` },

    });
  }
  return connect;
};


export const deleteTrademark=async(mathuonghieu, token, refreshtoken)=>{
  var newtoken = undefined;
  var connect = await axiosServices
  .delete(`${API_ENDPOINT}/xoa-thuonghieu?mathuonghieu=${mathuonghieu}`,
    
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
    .delete(`${API_ENDPOINT}/xoa-thuonghieu?mathuonghieu=${mathuonghieu}`,
     {
      headers: { Authorization: `Bearer ${token}` },

    });
  }
  return connect;
};
