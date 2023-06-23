import axios from "axios";

import {
  actionLoginError,
  actionLoginLoading,
  actionLoginSuccess,
  actionsignUpLoading,
  actionsingUpError,
  actionsingUpSuccess,
} from "./actionType";

let baseURL = "https://localhost/8080/";


export const loginFetch = (value) => (dispatch) => {
  dispatch(actionLoginLoading());
  return axios
    .post(`${baseURL}users/login`, value)
    .then((res) => {
      dispatch(actionLoginSuccess(res.data));
      localStorage.setItem(
        "user",
        JSON.stringify({email: res.data.user.email,name: res.data.user.name,role:res.data.user.role,token: res.data.token,isAuth: true})
      );
      console.log(res);
    })
    .catch((err) => {
      dispatch(actionLoginError(err.message));
      console.log(err);
    });
};


export const signUpFetch = (value) => (dispatch) => {
   dispatch(actionsignUpLoading())
  return  axios.post(`${baseURL}users/register`,value)
    .then((res)=>{
    dispatch(actionsingUpSuccess())
        console.log(res);
    })
    .catch((err)=>{
    dispatch(actionsingUpError(err.response))
        console.log(err);
    })
}


// conver 1 letter to upper case and rest to lower 
export function capitalizeFirstLetter(string) {
  console.log(string);
  const words = string?.split(' ');
  const capitalizedWords = words?.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return capitalizedWords?.join(' ');
}


export const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password should be at least 8 characters long';
    }
  
    if (!/\d/.test(password)) {
      return 'Password should contain at least one digit';
    }
  
    if (!/[a-z]/.test(password)) {
      return 'Password should contain at least one lowercase letter';
    }
  
    if (!/[A-Z]/.test(password)) {
      return 'Password should contain at least one uppercase letter';
    }
  
    if (!/[!@#$%^&*]/.test(password)) {
      return 'Password should contain at least one special character (!@#$%^&*)';
    }
  
    return ''; 
  };
  


  