import {
    SET_BOARD_FILLED, 
    SET_MODULES, 
    SET_RULES,
    SET_CALL_BACKEND_NOW,
    SET_SELECTED_MODULES,
    SET_MODULE_LOCATION 
} from "../actions/types";

const initialState = {
    selectedModules: [], 
    callBackendNow: false,
    rules: [],
    modules: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_BOARD_FILLED: 
            return {
                ...state,
                selectedModules: true
            }
            
        case SET_MODULES: 
            return {
                ...state,
                modules: action.payload
        }
        case SET_RULES: 
            return {
                
                ...state,
                rules: action.payload
        }

        case SET_CALL_BACKEND_NOW:
            return {
                ...state,
                callBackendNow: action.payload
            }
        
        case SET_SELECTED_MODULES:
            console.log('reducer')
            let unique = true;
            let indexOfDuplicate;
            const {moduleAdded, currentSelectedModules} = action;
    
            for(let i = 0; i < currentSelectedModules.length; i++) {
                if(currentSelectedModules[i].moduleCode === moduleAdded.moduleCode) {
                    unique = false;
                    indexOfDuplicate = i;
                }
            }

            if (!currentSelectedModules.includes(moduleAdded)) {
                if(unique) {
                    currentSelectedModules.push(moduleAdded);
                } else {
                    currentSelectedModules.splice(indexOfDuplicate, 1);
                    currentSelectedModules.push(moduleAdded);           
                }
            }

            return {
                ...state, 
                selectedModules: currentSelectedModules    
            }

        case SET_MODULE_LOCATION: 
            const { item, location, modules } = action;
            let changedModule;

            if(!location) {
                changedModule = modules.filter((object) => object.moduleCode !== item.id);
            } else {
            const moduleToChange = modules.filter((object) => object.moduleCode === item.id);
            moduleToChange[0].location =  location;
            changedModule = modules.filter((object) => object.moduleCode !== item.id).concat(moduleToChange[0])
            }
           
            return {
                ...state,
                selectedModules: changedModule
            }

        default:
            return state
    }
}

