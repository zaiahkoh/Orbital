import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  USER_REGISTERED
} from "./types";


// Register User
export const registerUser = (userData, social) => dispatch => {
  const link = social ? "http://172.19.162.53:3000/user/sociallogin" : "http://172.19.162.53:3000/user/register"
  axios.defaults.timeout = 2000;
  axios
    .post(link, userData)
    .then(res => dispatch(setUserRegistered())) 
    .catch(err => {
      if(err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }

      else {
        console.log(err);
        window.location.replace("/500-error")
      }
    }
    );
};

// Login - get user token
export const loginUser = (userData, status, social) => dispatch => {
  const link = social ? "http://172.19.162.53:3000/user/sociallogin" : "http://172.19.162.53:3000/user/login"
  axios.defaults.timeout = 2000;
  axios
    .post(link, userData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded, status));
    })
    .catch(err => {
      if(err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      } else {
        window.location.replace("/500-error")
      } 
    
    }
    );
};

// Set logged in user
export const setCurrentUser = (decoded, status) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    firstTimeRegistered: status
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// User registered
export const setUserRegistered = () => {
  return {
    type: USER_REGISTERED
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}, false));
};