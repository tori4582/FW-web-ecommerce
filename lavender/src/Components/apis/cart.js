import axiosServices from "./axiosServices";
import { API_ENDPOINT } from "../../Common/constants/index";
import { refreshToken } from "../service/refreshtoken";

export const loadCart = async (makhachhang, token, refreshtoken) => {
  const url = "/cart";
  var newtoken = undefined;
  var connect = await axiosServices
    .get(`${API_ENDPOINT}${url}?makhachhang=${makhachhang}`, { headers: { Authorization: `Bearer ${token}`}})
    .catch((error) => {
      
      if (error.response.status === 401) {
        
        newtoken = refreshToken(refreshtoken);
        console.log(newtoken)
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices
    .get(`${API_ENDPOINT}${url}?makhachhang=${makhachhang}`, { headers: { Authorization: `Bearer ${newtoken}`}});
  }
  return connect;
};
export const addToCart = async (data, token, refreshtoken) => {
  const url = "/add-to-cart";

  var newtoken = undefined;
  var connect = await axiosServices
    .post(API_ENDPOINT + url, data, { headers: { Authorization: `Bearer ${token}`}})
    .catch((error) => {
      
      if (error.response.status === 401) {
        
        newtoken = refreshToken(refreshtoken);
        console.log(newtoken)
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices
    .post(API_ENDPOINT + url, data, { headers: { Authorization: `Bearer ${newtoken}`}});
  }
  return connect;
};
export const updateCart = async (data, token, refreshtoken) => {
  const url = "/update-cart";

  var newtoken = undefined;
  var connect = await axiosServices
    .get(API_ENDPOINT + url, data, { headers: { Authorization: `Bearer ${token}`}})
    .catch((error) => {
      
      if (error.response.status === 401) {
        
        newtoken = refreshToken(refreshtoken);
        console.log(newtoken)
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices
    .get(API_ENDPOINT + url, data, { headers: { Authorization: `Bearer ${newtoken}`}});
  }
  return connect;
};
export const deleteProduct =  async (makhachhang, masanpham, token, refreshtoken) => {

  var url = "/cart/" +makhachhang + "/delete?productid=" + masanpham;

  var newtoken = undefined;
  var connect = await axiosServices
    .get(API_ENDPOINT + url, { headers: { Authorization: `Bearer ${token}`}})
    .catch((error) => {
      
      if (error.response.status === 401) {
        
        newtoken = refreshToken(refreshtoken);
        console.log(newtoken)
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices
    .get(API_ENDPOINT + url, { headers: { Authorization: `Bearer ${newtoken}`}});
  }
  return connect;
};
