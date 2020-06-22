import {
    SET_MODULES_FOR_CAP,
    CALCULATE_CAP,
    SET_SEMESTER_OPTIONS
} from "../actions/types";

const initialState = {
    CAPModules: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_MODULES_FOR_CAP: 
            return {
                ...state, 
                CAPModules: action.payload
            }
        default: 
            return state;
    }
}

