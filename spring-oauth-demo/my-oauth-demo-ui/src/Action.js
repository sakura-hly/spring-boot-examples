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
            error => dispatch(setMeSuccess("none")),
        )
    };
}

export const initMe = () => {
    return dispatch => {
        dispatch(setMeSuccess('init'));
    }
}