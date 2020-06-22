import {
    UPDATE_USER_SETTINGS
} from "./types";

import axios from "axios";

export const updateUserSettings = (key, value) => {
    return {
        type: UPDATE_USER_SETTINGS,
        payload: value
    }
}

export const callBackendAPI = (userData) => dispatch => {
    axios.defaults.timeout = 2000;
    axios
        .put("http://172.19.162.53:3000/account", userData)
        .then(res => dispatch(updateUserSettings()))
        .catch(err => console.log(err))

}