import {LOGIN, LOGOUT} from './types';

export const login = (user) => dispatch => {
    dispatch({
        type: LOGIN,
        payload: user
    })
};

export const logout = (user) => dispatch => {
    dispatch({
        type: LOGOUT,
        payload: user
    })
};

