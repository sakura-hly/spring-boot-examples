import { combineReducers } from 'redux'
import { SET_ME_SUCCESS } from "./Type";

const initState = {
    name: 'init'
}

function meReducer(state = initState, action) {

    switch (action.type) {
        case SET_ME_SUCCESS:
            return {
                ...state,
                name: action.name
            };
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    meReducer
})

export default rootReducer