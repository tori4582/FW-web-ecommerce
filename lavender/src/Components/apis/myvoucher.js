import axiosServices from "./axiosServices";
import { API_ENDPOINT } from "../../Common/constants/index";
import { refreshToken } from "../service/refreshtoken";

export const myVoucher = async (makhachhang, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .get(`${API_ENDPOINT}/khuyenmaicuatoi?makhachhang=${makhachhang}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.get(
      `${API_ENDPOINT}/khuyenmaicuatoi?makhachhang=${makhachhang}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};

export const detailMyVoucher = async (makhachhang, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .get(`${API_ENDPOINT}/chitietkhuyenmaicuatoi?makhachhang=${makhachhang}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.get(
      `${API_ENDPOINT}/chitietkhuyenmaicuatoi?makhachhang=${makhachhang}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};

export const deleteMyVoucher = async (
  makhachhang,
  makhuyenmai,
  token,
  refreshtoken
) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .delete(
      `${API_ENDPOINT}/khuyenmaicuatoi?makhachhang=${makhachhang}&makhuyenmai=${makhuyenmai}`,
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
    return await axiosServices.delete(
      `${API_ENDPOINT}/khuyenmaicuatoi?makhachhang=${makhachhang}&makhuyenmai=${makhuyenmai}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};
export const deleteAllMyVoucher = async (makhachhang, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .delete(
      `${API_ENDPOINT}/xoa-tatca-khuyenmaicuatoi?makhachhang=${makhachhang}`,
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
    return await axiosServices.delete(
      `${API_ENDPOINT}/xoa-tatca-khuyenmaicuatoi?makhachhang=${makhachhang}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};

export const luuVoucher = async (
  makhachhang,
  makhuyenmai,
  token,
  refreshtoken
) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .post(
      `${API_ENDPOINT}/luu-khuyenmai`,
      { makhachhang, makhuyenmai },
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
    return await axiosServices.post(
      `${API_ENDPOINT}/luu-khuyenmai`,
      { makhachhang, makhuyenmai },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};
