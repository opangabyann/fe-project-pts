const initialState = {
    username: "",
    role : "",
    id_outlet : "",
    nama_outlet : "",
    isAuth: false,
  };
  
  export const authProses = (state = initialState, action) => {
    if (action.type === "login") {

      return {
        ...state,
        username: action.username,
        role: action.role,
        id_outlet : action.id_outlet,
        nama_outlet : action?.nama_outlet,
        isAuth: true,
       
      };
    }

    return {
        ...state
    };
  };