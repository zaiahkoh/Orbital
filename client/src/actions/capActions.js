import {
    CALCULATE_CAP,
    SET_SEMESTER_OPTIONS,
    CLEAN_UP_CAP,
    SET_CAP
} from "./types";

export const calculateCAP = (selectedModules) => {
    return {
        type: CALCULATE_CAP,
        payload: selectedModules
    }
}

export const setCAP = (CAP, category) => {
    console.log('called')
    return {
        type: SET_CAP,
        payload: CAP,
        category
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
