import * as registerApi from "../../apis/register";
import * as registerConst from "../constrants/registerConst";

export const postRegister = () => {
  return {
    type: registerConst.POST_REGISTER,
  };
};

export const postRegisterSuccess = (data) => {
  return {
    type: registerConst.POST_REGISTER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const postRegisterFailed = (error) => {
  return {
    type: registerConst.POST_REGISTER_FAILED,
    payload: {
      error,
    },
  };
};

export const postRegisterReport = (res) => {
  return (dispatch) => {
    registerApi
      .register(res)
      .then((res) => {
        if (res.status===200) dispatch(postRegisterSuccess(res));
        else dispatch(postRegisterFailed(res));
      })
      .catch((error) => {
        // console.log(error)
        dispatch(postRegisterFailed(error));
      });
  };
};
