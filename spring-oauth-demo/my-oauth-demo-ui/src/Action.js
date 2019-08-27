import axios from "axios";

const setMeSuccess = (soeid) => ({
    type: 'SET_ME_SUCCESS',
    soeid,
    receivedAt: Date.now()
});

const setMeFail = (error, soeid) => ({
    type: 'SET_ME_FAIL',
    error,
    soeid,
    receivedAt: Date.now(),
});

export function setMe() {
    // We can invert control here by returning a function - the "thunk".
    // When this function is passed to `dispatch`, the thunk middleware will intercept it,
    // and call it with `dispatch` and `getState` as arguments. 
    // This gives the thunk function the ability to run some logic, and still interact with the store.
    return function (dispatch) {
        return axios({
                method: 'get',
                url: 'http://localhost:8080/me',
                // headers: {
                //     '':'*'
                // },
                withCredentials: true
            })
            .then(
                res => dispatch(setMeSuccess(res.data.me)),
                error => dispatch(setMeFail(error, 'NO ONE'))
            );
    };
}