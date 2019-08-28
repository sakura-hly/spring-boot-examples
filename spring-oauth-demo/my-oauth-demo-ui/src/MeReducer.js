import { combineReducers } from 'redux'
import { SET_ME_SUCCESS } from "./Type";

const initState = {
    name: 'none'
}

function meReducer(state = initState, action) {

    switch (action.type) {
        case SET_ME_SUCCESS:
            // return Object.assign({}, state, {
            //     name: action.name
            // })
            // return action;
            return {
                ...state,
                name: action.name
            };
        // case 'SET_ME_FAIL':
        //     return Object.assign({}, state, {
        //         name: action.name
        //     })
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    meReducer
})

export default rootReducer