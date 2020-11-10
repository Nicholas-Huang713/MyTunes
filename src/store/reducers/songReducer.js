import {SEARCH_MUSIC, PLAY_SONG} from '../actions/types';

const initialState = {
    searchList: [],
    currentSong: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SEARCH_MUSIC: 
            return {
                ...state,
                searchList: action.payload
            };
        case PLAY_SONG: 
            return {
                ...state,
                currentSong: action.payload
            };
            
        default:
            return state;
    }
}