import { combineReducers } from 'redux'
import { SET_ME_SUCCESS } from "./Type";

const initState = {
    name: 'NO ONE'
}

function meReducer(state = initState, action) {

    switch (action.type) {
        case SET_ME_SUCCESS:
            return action.name;
        // case 'SET_ME_FAIL':
        //     return Object.assign({}, state, {
        //         name: action.name
        //     })
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    me: meReducer
})

export default rootReducer