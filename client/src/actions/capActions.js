import {
    SET_MODULES_FOR_CAP,
    CALCULATE_CAP,
    SET_SEMESTER_OPTIONS
} from "./types";

const setModulesForCap = (modplan) => {
    return {
        type: SET_MODULES_FOR_CAP,
        payload: modplan
    }
}

const calculateCAP = (prevCAP) => {
    return {
        type: CALCULATE_CAP
    }
}

const setSemesterOptions = () => {
    return {
        type: SET_SEMESTER_OPTIONS
    }
}