import {HOME, NOT_HOME} from './types';

export const home = () => dispatch => {
    dispatch({
        type: HOME
    })
};

export const notHome = () => dispatch => {
    dispatch({
        type: NOT_HOME
    })
};