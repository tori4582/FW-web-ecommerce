import axiosServices from "./axiosServices";
import { API_ENDPOINT } from "../../Common/constants/index";
import { refreshToken } from "../service/refreshtoken";

export const findCustomerByBillId = async (sohoadon, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .get(`${API_ENDPOINT}/tim-khachhang-theo-sohoadon?sohoadon=${sohoadon}`, {
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
      `${API_ENDPOINT}/tim-khachhang-theo-sohoadon?sohoadon=${sohoadon}`,
      { headers: { Authorization: `Bearer ${newtoken}` } }
    );
  }
  return connect;
};
export const allCustomer = async (token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .get(`${API_ENDPOINT}/tatca-khachhang`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);

        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.get(`${API_ENDPOINT}/tatca-khachhang`, {
      headers: { Authorization: `Bearer ${newtoken}` },
    });
  }
  return connect;
};

export const thayDoiThongTin = async (data, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .put(`${API_ENDPOINT}/khachhang/thaydoi`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);

        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.put(`${API_ENDPOINT}/khachhang/thaydoi`, data, {
      headers: { Authorization: `Bearer ${newtoken}` },
    });
  }
  return connect;
};

export const findCustomerByCustomerId = async (makhachhang) => {
  return await axiosServices.get(
    `${API_ENDPOINT}/tim-khachhang-theo-makhachhang?makhachhang=${makhachhang}`
  );
};

export const thayDoiSDT = async (makhachhang, sdt, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .put(`${API_ENDPOINT}/khachhang/thaydoi/sdt`, {makhachhang, sdt}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.put(
      `${API_ENDPOINT}/khachhang/thaydoi/sdt`,
      {makhachhang, sdt},
      { headers: { Authorization: `Bearer ${newtoken}` } }
    );
  }
  return connect;
};

export const thayDoiEmail = async (makhachhang, email, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .put(`${API_ENDPOINT}/khachhang/thaydoi/email`, {makhachhang, email}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);

        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.put(
      `${API_ENDPOINT}/khachhang/thaydoi/email`,
      {makhachhang, email},
      { headers: { Authorization: `Bearer ${newtoken}` } }
    );
  }
  return connect;
};

export const addCustomer = async (fd, progress, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .post(`${API_ENDPOINT}/them-khachhang`, fd, {
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
    return await axiosServices.post(`${API_ENDPOINT}/them-khachhang`, fd, {
      headers: { Authorization: `Bearer ${token}` },
      onUploadProgress: (progressEvent) => {
        progress((progressEvent.loaded / progressEvent.total) * 100);
      },
    });
  }
  return connect;
};

export const editCustomer = async (fd, progress, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .post(`${API_ENDPOINT}/sua-khachhang`, fd, {
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
    return await axiosServices.post(`${API_ENDPOINT}/sua-khachhang`, fd, {
      headers: { Authorization: `Bearer ${token}` },
      onUploadProgress: (progressEvent) => {
        progress((progressEvent.loaded / progressEvent.total) * 100);
      },
    });
  }
  return connect;
};

export const deleteCustomer = async (makhachhang, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .delete(`${API_ENDPOINT}/xoa-khachhang?makhachhang=${makhachhang}`, {
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
      `${API_ENDPOINT}/xoa-khachhang?makhachhang=${makhachhang}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};
export const hoadonDagiao = async (makhachhang, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .get(
      `${API_ENDPOINT}/hoadon-dagiao-theo-makhachhang?makhachhang=${makhachhang}`,
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
      `${API_ENDPOINT}/hoadon-dagiao-theo-makhachhang?makhachhang=${makhachhang}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};
