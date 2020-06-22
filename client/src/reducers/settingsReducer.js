import {
    UPDATE_USER_SETTINGS
} from "../actions/types";

const initialState = {

}

export default function (state = initialState, action ) {
    switch(action.type) {
        case UPDATE_USER_SETTINGS:
            return {
                ...state,
                modplan: action.payload
            }
        
        default:
            return state;
    }
}
