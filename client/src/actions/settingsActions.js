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
            console.log(err);
            window.location.replace("/500-error")
        })
}

export const updateSettings = (userData) => dispatch => {
    axios.defaults.timeout = 6000;
    console.log('to send' + userData)
    axios
        .put("http://172.19.162.53:3000/account", userData)
        .then(res => dispatch(setUserSettings(res.data.updated)))
        .catch(err => {
                console.log(err);
                // window.location.replace("/500-error")
            })
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

export const setTargetGradYearOptions = (AY, Semester) => {
    return {
        type: SET_TARGET_GRAD_OPTIONS,
        AY,
        Semester
    }
}

//turn array of choices into options dropdown
// export const generateOptions = (optionList, category,) {

//     let facIndex = this.state.facIndex;
//   if(choices === 'faculty'){
//     return this.state.dummyfac.map((obj) => {
//       return (
//       <option value={Object.keys(obj)}>
//         {Object.keys(obj)}
//       </option>
//       );
//     });
//   } else if(choices === 'major') {
//       if(this.state.faculty) {
//     return this.state.dummyfac
//            [facIndex]
//            [this.state.faculty].map((obj) => {
//                   return (
//                     <option value={Object.keys(obj)}>
//                       {Object.keys(obj)}
//                     </option>
//                   )
//               }
//     )}
//   } else if(choices === 'specialisation') {
//       if(this.state.major && this.state.faculty) {
//       return this.state.dummyfac
//              [facIndex]
//              [this.state.faculty][this.state.majorIndex][this.state.major].map((item) => {
//                   return (
//                     <option>
//                       {item}
//                     </option>
//                   )
//                 }    
//       )}
//   } else if(choices === 'residence') {
//     return this.state.residenceOptions.map((obj) => {
//       return (
//       <option value={obj}>
//         {obj}
//       </option>
//       );
//     });
//   } else {
//       let options;

//       if(choices === 'matriculationYear') {
//         options = this.props.settings.matriculationOptions
//       } else {
//         options = this.props.settings.targetGradOptions
//       }

//     return options.map((option) => {
//       return (
//       <option value={option}>
//         {option}
//       </option>
//       );
//     });
//   }
// }


