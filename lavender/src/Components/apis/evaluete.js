import axiosServices from "./axiosServices";
import { API_ENDPOINT } from "../../Common/constants/index";
import { refreshToken } from "../service/refreshtoken";

export const addEvalue = async (
  fd,
  makhachhang,
  masanpham,
  token,
  refreshtoken
) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .post(
      `${API_ENDPOINT}/them-danhgia?makhachhang=${makhachhang}&masanpham=${masanpham}`,
      fd,
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
      `${API_ENDPOINT}/them-danhgia?makhachhang=${makhachhang}&masanpham=${masanpham}`,
      fd,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};

export const getEvaluete = (masanpham) => {
  return axiosServices.get(
    `${API_ENDPOINT}/xem-danhgia?masanpham=${masanpham}`
  );
};
export const evalueteByProductId = (masanpham) => {
  return axiosServices.get(
    `${API_ENDPOINT}/danhgia-theo-masanpham?masanpham=${masanpham}`
  );
};
