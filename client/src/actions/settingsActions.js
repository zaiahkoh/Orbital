import {
    SET_USER_SETTINGS,
    SET_CURRENT_SEMESTER,
    SET_MATRICULATION_OPTIONS,
    SET_TARGET_GRAD_OPTIONS
} from "./types";

import axios from "axios";

export const setUserSettings = (userData) => {
    return {
        type: SET_USER_SETTINGS,
        payload: userData
    }
}

export const initialSettings = () => dispatch => {
    axios.defaults.timeout = 2000;
    axios  
        .get('http://172.19.162.53:3000/account')
        .then(res => dispatch(setUserSettings(res.data)))
        .catch(err => {
            window.location.replace("/500-error")
        })
}

export const updateSettings = (userData) => dispatch => {
    axios.defaults.timeout = 2000;
    axios
        .put("http://172.19.162.53:3000/account", userData)
        .then(res => dispatch(setUserSettings(res.data.updated)))
        .catch(err => window.location.replace("/500-error"))
};

export const setCurrentSemester = (currentAY, currentSemester) => {
    return {
        type: SET_CURRENT_SEMESTER,
        currentAY,
        currentSemester
    }
}

export const setMatriculationYearOptions = (currentAY, currentSemester) => {
    return {
        type: SET_MATRICULATION_OPTIONS,
        currentAY,
        currentSemester
    }
}

export const setTargetGradYearOptions = (currentAY, currentSemester) => {
    return {
        type: SET_TARGET_GRAD_OPTIONS,
        currentAY,
        currentSemester
    }
}