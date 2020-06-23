import {
    SET_USER_SETTINGS,
    SET_CURRENT_SEMESTER,
    SET_MATRICULATION_OPTIONS,
    SET_TARGET_GRAD_OPTIONS
} from "../actions/types";

const initialState = {
    currentAY: null,
    currentSemester: null,
    matriculationOptions:[],
    targetGradOptions: [],
    userInfo: null
}

export default function (state = initialState, action ) {
    switch(action.type) {
        case SET_USER_SETTINGS:
            return {
                ...state,
                userInfo: action.payload
            }
        
        case SET_CURRENT_SEMESTER:
            return {
                ...state,
                currentAY: action.currentAY,
                currentSemester: action.currentSemester
            }
        
        case SET_MATRICULATION_OPTIONS:
            const { currentAY, currentSemester } = action;
            let matriculationOptions = []

            if(currentSemester === "Semester 1") { 
                for(let i = 0; i <= 5; i++) {
                    const year = Number(currentAY.substr(0,4));
                    const start = year - i;
                    const end = start + 1;
                    const value = `AY ${start} / ${end} (Year ${i+ 1})`
                    matriculationOptions[i] = value;
                }
            } else {
                for(let i = 0; i <= 5; i++ ) {
                    const year = Number(currentAY.substr(5,4));
                    const end = year - i;
                    const start = end - 1;
                    const value = `AY ${start} / ${end} (Year ${i+ 1})`
                    matriculationOptions[i] = value;
                }
            }

            return{
                ...state,
                matriculationOptions: matriculationOptions    
            }
        
        case SET_TARGET_GRAD_OPTIONS:
            const { AY, Semester } = action;
            let targetGradOptions = []

            if(currentSemester === "Semester 1") { 
                for(let i = 0; i <= 5; i++) {
                    const year = Number(AY.substr(0,4));
                    const start = year - i;
                    const end = start + 1;
                    const value = `In AY ${start} / ${end} (Year ${i+ 1})`
                    matriculationOptions[i] = value;
                }
            } else {
                for(let i = 0; i <= 5; i++ ) {
                    const year = Number(currentAY.substr(5,4));
                    const end = year - i;
                    const start = end - 1;
                    const value = `AY ${start} / ${end} (Year ${i+ 1})`
                    matriculationOptions[i] = value;
                }
            }

            return{
                ...state,
                targetGradOptions: matriculationOptions    
            }
        default:
            return state;
    }
}
