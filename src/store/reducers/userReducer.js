import {LOGIN, LOGOUT} from '../actions/types';

const initialState = {
    isLogged: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOGIN: 
            return {
                ...state,
                isLogged: action.payload
            };

        case LOGOUT: 
            return {
                ...state,
                isLogged: action.payload
            };
            
        default:
            return state;
    }
}