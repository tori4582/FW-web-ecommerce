import * as registerConst from "../constrants/registerConst";
import * as myToast from "../../../Common/helper/toastHelper"
const initialState = {
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case registerConst.POST_REGISTER: {
      return { ...state};
    }
    case registerConst.POST_REGISTER_SUCCESS: {  
      myToast.toastSucces("Đăng ký thành công");
            return {
        ...state
      };
    }
    case registerConst.POST_REGISTER_FAILED: {
      if (action.payload.error.response.data.value!==undefined) {
        myToast.toastError(action.payload.error.response.data.value);
      }
      else{
        myToast.toastError("Đăng ký thất bại");
      }
      return { ...state};
    }
    default:
      return state;
  }
};
export default reducer;
