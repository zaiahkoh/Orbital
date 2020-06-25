import {
    SET_MODULES_FOR_CAP,
    CALCULATE_CAP,
    SET_SEMESTER_OPTIONS,
    CLEAN_UP_CAP
} from "../actions/types";

const initialState = {
    CAPModules: [],
    semesterOptions: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_MODULES_FOR_CAP: 
            return {
                ...state, 
                CAPModules: action.payload
            }
        
        case SET_SEMESTER_OPTIONS: 
            let sem1;
            let sem2;
            let semesterOptions = [];

            for(let i = 1; i < (action.payload * 2); i += 2) {
                const year = Math.ceil(i / 2);
                sem1 = `Year ${year} Semester 1`;
                sem2 = `Year ${year} Semester 2`;
                semesterOptions[i - 1] = sem1;
                semesterOptions[i] = sem2;
            }

            return {
                ...state,
                semesterOptions: semesterOptions
            }

        case CLEAN_UP_CAP:
            return initialState;

        default: 
            return state;
    }
}

