import {
    SET_MODULES_FOR_CAP,
    CALCULATE_CAP,
    SET_SEMESTER_OPTIONS,
    CLEAN_UP_CAP
} from "./types";

export const setModulesForCap = (modplan) => {
    return {
        type: SET_MODULES_FOR_CAP,
        payload: modplan
    }
}

export const calculateCAP = (prevCAP) => {
    return {
        type: CALCULATE_CAP
    }
}

export const setSemesterOptions = (years) => {
    return {
        type: SET_SEMESTER_OPTIONS,
        payload: years
    }
}

export const cleanUpCAP = () => {
    return { 
        type: CLEAN_UP_CAP
    }
}
