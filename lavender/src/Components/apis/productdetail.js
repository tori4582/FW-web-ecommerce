import axiosServices from "./axiosServices";
import { API_ENDPOINT } from "../../Common/constants/index";
import { refreshToken } from "../service/refreshtoken";

export const addProductdetail = async (fd, progress, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .post(`${API_ENDPOINT}/them-chitietsanpham`, fd, {
      headers: { Authorization: `Bearer ${token}` },
      onUploadProgress: (progressEvent) => {
        progress((progressEvent.loaded / progressEvent.total) * 100);
      },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.post(`${API_ENDPOINT}/them-chitietsanpham`, fd, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  return connect;
};

export const editProductdetail = async (fd, progress, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .post(`${API_ENDPOINT}/sua-chitietsanpham`, fd, {
      headers: { Authorization: `Bearer ${token}` },
      onUploadProgress: (progressEvent) => {
        progress((progressEvent.loaded / progressEvent.total) * 100);
      },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.post(`${API_ENDPOINT}/sua-chitietsanpham`, fd, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  return connect;
};

export const allProductdetail = async (token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .get(`${API_ENDPOINT}/tatca-chitietsanpham`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.get(`${API_ENDPOINT}/tatca-chitietsanpham`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  return connect;
};

export const deleteProductdetail = async (imei, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .delete(`${API_ENDPOINT}/xoa-chitietsanpham?imei=${imei}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.delete(
      `${API_ENDPOINT}/xoa-chitietsanpham?imei=${imei}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};

export const timMausacBangMasanpham = (masanpham) => {
  return axiosServices.get(
    `${API_ENDPOINT}/tim-mausac-bang-masanpham?masanpham=${masanpham}`
  );
};
export const timDungluongBangMasanpham = (masanpham) => {
  return axiosServices.get(
    `${API_ENDPOINT}/tim-dungluong-bang-masanpham?masanpham=${masanpham}`
  );
};
