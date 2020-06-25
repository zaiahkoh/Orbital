import axios from 'axios';
import {
    SET_BOARD_FILLED,
    SET_MODULES,
    SET_RULES,
    SET_CALL_BACKEND_NOW,
    SET_SELECTED_MODULES,
    SET_MODULE_LOCATION,
    SET_CURRRENT_SEMESTER,
    CLEAN_UP_MODPLAN
} from './types';



export const setIsBoardFilled = () => {
    return {
        type: SET_BOARD_FILLED,
    }
}

export const callBackendAPI = (backend) => dispatch => {
    let link = backend === 'NUSMods' ? 'https://api.nusmods.com/v2/2018-2019/moduleInfo.json' 
                    : 'http://172.19.162.53:3000/rules/r_cs_degree';
    let func = (backend === 'NUSMods') ? setModules : setRules;
    return fetch(link)
    .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                throw Error(response.json().message)
            }
        }) 
    .then(res => dispatch(func(res)))
    .catch(err => {
        console.log(err)
    });
}

//AXIOS CALL BUT IT DOESNT WORK -- FOR FUTURE REFERENCE
// export const callBackendAPI = () => dispatch => {

//     const headers = { headers: {'accept': 'application/json'}}
//     axios.all([
//         axios.get('https://api.nusmods.com/v2/2018-2019/moduleInfo.json', headers),
//         axios.get('http://172.19.162.53:3000/rules/r_cs_degree')
//     ])
//     .then(resArr => {
//         dispatch(setModules(resArr[0]));
//         dispatch(setRules(resArr[1].data));
//     }) 
//     .catch(err => {
//         console.log(err)
//     });
// }

export const setModules = (modules) => {
    return {
        type: SET_MODULES,
        payload: modules
    }
}

export const setRules = (rules) => {
    return {
        type: SET_RULES,
        payload: rules
    }
}

export const setCallBackendNow = (status) => {
    return {
        type: SET_CALL_BACKEND_NOW,
        payload: status
    }
}

export const setSelectedModules = (object, selectedModules) => {
    return { 
        type: SET_SELECTED_MODULES,
        moduleAdded: object,
        currentSelectedModules: selectedModules
    }
}

export const setModuleLocation = (item, location, AY, selectedModules) => {
    return { 
        type: SET_MODULE_LOCATION,
        item,
        location,
        AY,
        modules: selectedModules
    }
}

export const setCurrentSemester = (AY, semester) => {
    return {
        type: SET_CURRRENT_SEMESTER,
        AY,
        semester
    }
}

export const cleanUpModPlan = () => {
    return { 
        type: CLEAN_UP_MODPLAN
    }
}