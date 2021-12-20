import * as loginApi from "../apis/login";
import Cookies from "universal-cookie";

export const refreshToken = async (refreshtoken) => {
  if (refreshtoken===undefined) return;
  var cookie = new Cookies();
  var newojtoken = undefined;
  await loginApi
    .refreshToken(refreshtoken)
    .then((success) => {
      if (success.status === 200) newojtoken = success.data.value;
      else newojtoken = undefined;
    })
    .catch(() => {
        newojtoken = undefined;
    });
  if (newojtoken !== undefined) {
    let dtoken = new Date();
    dtoken.setTime(dtoken.getTime() + 60 * 60 * 1000);
    cookie.set("token", newojtoken.token, {
      path: "/",
      expires: dtoken,
      httpOnly: false,
      secure: true,
      sameSite: true,
    });

    let drefresh = new Date();
    drefresh.setTime(drefresh.getTime() + 10 * 24 * 60 * 60 * 1000);
    cookie.set("refreshtoken", newojtoken.refreshtoken, {
      path: "/",
      expires: drefresh,
      httpOnly: false,
      secure: true,
      sameSite: true,
    });
    return newojtoken.token;
  }
  cookie.remove("token");
  cookie.remove("refreshtoken");
};
