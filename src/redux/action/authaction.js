import Cookies from "js-cookie";
import { authMeProcess, LoginProsses } from "../../API/auth";


export function authLogin(payload) {
    return async (dispatch) => {
      try {
        const response = await LoginProsses(payload);
        const data = response.data;
        console.log(data?.user?.outlet?.nama)
        console.log("response =>", response);
        dispatch({
          type: "login",
          username: data?.user?.username,
          role: data?.user?.role,
          id_outlet : data?.user?.id_outlet,
          nama_outlet : data?.user?.outlet?.nama,
        //   email: data?.user?.email,
          isAuth: true,
        });
        
        Cookies.set("myapps_token", data?.token);
        return data;
      } catch (err) {
        console.log(err);
        return err;
      }
    };
  }

  export function authMe(payload) {
    return async (dispatch) => {
      try {
        let response = await authMeProcess();
        let data = response.data;
        console.log(data?.user?.outlet?.nama)
  console.log('auth =>',response)
        dispatch({
          type: "login",
          username: data?.user?.username,
          role: data?.user?.role,
          id_outlet : data?.user?.id_outlet,
          nama_outlet : data?.user?.outlet?.nama,
          isAuth: true,
        });
  
        Cookies.set("myapps_token", data?.token);
        return data;
      } catch (err) {
        console.log(err);
        return err;
      }
    };
  }