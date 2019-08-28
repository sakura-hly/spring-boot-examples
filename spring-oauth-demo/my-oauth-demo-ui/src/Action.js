import axios from "axios";
import { SET_ME_SUCCESS } from "./Type";

const setMeSuccess = (name) => ({
    type: SET_ME_SUCCESS,
    name
});

const setMeFail = (error, name) => ({
    type: 'SET_ME_FAIL',
    name,
    receivedAt: Date.now(),
});

export const setMe = () => { 
    // We can invert control here by returning a function - the "thunk".
    // When this function is passed to `dispatch`, the thunk middleware will intercept it,
    // and call it with `dispatch` and `getState` as arguments. 
    // This gives the thunk function the ability to run some logic, and still interact with the store.
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost:8080/me',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            withCredentials: true
        })
        .then(
            res => dispatch(setMeSuccess(res.data.name)),
            error => console.log(error),
        )
        // .then(name => {
        //     dispatch(setMeSuccess(name));
        // });
        // .catch(error => {
        //     throw(error);
        // });
    };
}