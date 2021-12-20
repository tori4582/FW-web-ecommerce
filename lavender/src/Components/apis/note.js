import axiosServices from "./axiosServices";
import { API_ENDPOINT } from "../../Common/constants/index";
import { refreshToken } from "../service/refreshtoken";

export const importNote = async (token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .get(API_ENDPOINT + "/phieu-nhap-san-pham", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.get(API_ENDPOINT + "/phieu-nhap-san-pham", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  return connect;
};
export const addOrUpdateNote = async (data, token, refreshtoken) => {
  var newtoken = undefined;
  const url = "/them-sua-phieu-nhap";
  var connect = await axiosServices
    .post(API_ENDPOINT + url, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.post(API_ENDPOINT + url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  return connect;
};
export const deleteNote = async (maphieunhap, token, refreshtoken) => {
  var newtoken = undefined;
  const url = "/xoa-phieunhap?maphieunhap=";
  var connect = await axiosServices
    .delete(API_ENDPOINT + url + maphieunhap.delete(API_ENDPOINT + url + maphieunhap)
    ,
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
    .delete(API_ENDPOINT + url + maphieunhap, {
      headers: { Authorization: `Bearer ${token}` }
      ,
    });
  }
  return connect;
};
