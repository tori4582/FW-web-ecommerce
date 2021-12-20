import axiosServices from "./axiosServices";
import { API_ENDPOINT } from "../../Common/constants/index";
import { refreshToken } from "../service/refreshtoken";

export const allPrromotion = () => {
  return axiosServices.get(`${API_ENDPOINT}/tatca-khuyenmai`);
};
export const findVoucherById = (makhuyenmai) => {
  return axiosServices.get(
    `${API_ENDPOINT}/khuyenmai?makhuyenmai=${makhuyenmai}`
  );
};
export const checkVoucherById = (makhuyenmai) => {
  return axiosServices.get(
    `${API_ENDPOINT}/kiemtramakhuyenmai?makhuyenmai=${makhuyenmai}`
  );
};
export const khuyenmaiHientai = () => {
  return axiosServices.get(`${API_ENDPOINT}/khuyenmai-hientai`);
};

export const addPromotion = async (fd, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .post(`${API_ENDPOINT}/them-khuyenmai`, fd, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);

        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.post(`${API_ENDPOINT}/them-khuyenmai`, fd, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  return connect;
};

export const editPromotion = async (fd, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .post(`${API_ENDPOINT}/sua-khuyenmai`, fd, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);

        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.post(`${API_ENDPOINT}/sua-khuyenmai`, fd, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  return connect;
};

export const allPromotion = async (token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .get(`${API_ENDPOINT}/tatca-khuyenmai`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);

        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.get(`${API_ENDPOINT}/tatca-khuyenmai`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  return connect;
};

export const deletePromotion = async (makhuyenmai, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .delete(`${API_ENDPOINT}/xoa-khuyenmai?makhuyenmai=${makhuyenmai}`, {
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
      `${API_ENDPOINT}/xoa-khuyenmai?makhuyenmai=${makhuyenmai}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};
