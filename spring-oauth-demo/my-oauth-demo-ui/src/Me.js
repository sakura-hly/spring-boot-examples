import { combineReducers } from 'redux'

const initState = {
    soeid: 'No One'
}

function meReducer(state = initState, action) {

    switch (action.type) {
        case 'SET_ME':
            return Object.assign({}, state, {
                soeid: action.soeid
            })

        default:
            return state;
    }
}


const rootReducer = combineReducers({
    meReducer,
})

export default rootReducer