import axiosServices from "./axiosServices";
import { API_ENDPOINT } from "../../Common/constants/index";
import { refreshToken } from "../service/refreshtoken";

export const loadDetailCartByCartId = async (
  magiohang,
  token,
  refreshtoken
) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .get(
      `${API_ENDPOINT}/chitietgiohang-bang-magiohang?magiohang=${magiohang}`,
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
    return await axiosServices.get(
      `${API_ENDPOINT}/chitietgiohang-bang-magiohang?magiohang=${magiohang}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};
export const setQuantityForDetailCart = async (
  magiohang,
  masanpham,
  dungluong,
  mausac,
  soluong,
  token,
  refreshtoken
) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .post(
      `${API_ENDPOINT}/dat-soluong-cho-chitietgiohang?`,
      { magiohang, masanpham, dungluong, mausac, soluong },
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
      `${API_ENDPOINT}/dat-soluong-cho-chitietgiohang?`,
      { magiohang, masanpham, dungluong, mausac, soluong },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};
export const deleteDetailCart = async (
  magiohang,
  masanpham,
  token,
  refreshtoken
) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .delete(
      `${API_ENDPOINT}/xoa-chitietgiohang?magiohang=${magiohang}&masanpham=${masanpham}`,
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
      `${API_ENDPOINT}/xoa-chitietgiohang?magiohang=${magiohang}&masanpham=${masanpham}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};
export const deleteAllDetailCart = async (magiohang, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .delete(`${API_ENDPOINT}/xoa-tatca-chitietgiohang?magiohang=${magiohang}`, {
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
      `${API_ENDPOINT}/xoa-tatca-chitietgiohang?magiohang=${magiohang}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};
