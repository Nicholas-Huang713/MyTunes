import {HOME, NOT_HOME} from '../actions/types';

const initialState = {
    homePage: true
}

export default function(state = initialState, action) {
    switch(action.type) {
        case HOME: 
            return {
                ...state,
                homePage: true
            };
        case NOT_HOME: 
            return {
                ...state,
                homePage: false
            };
        
        
        default:
            return state;
    }
}