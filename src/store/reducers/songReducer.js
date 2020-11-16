import {SET_USER_FAVES, LOG_OUT, SEARCH_MUSIC, PLAY_SONG, SET_PLAYING, SET_PAUSE, SET_CURRENT_SONG, SET_FAVE_ID_LIST, ADD_TO_FAVE_ID_LIST, REMOVE_FROM_FAVE_ID_LIST} from '../actions/types';

const initialState = {
    searchList: [],
    currentSong: {},
    compareSong: {},
    playing: false, 
    faveIdList: [],
    otherUserPlaylist: [],
    userFaves: {}
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
        case SET_PLAYING: 
            return {
                ...state,
                playing: true
            };
        case SET_PAUSE: 
            return {
                ...state,
                playing: false
            };
        case SET_CURRENT_SONG: 
            return {
                ...state,
                compareSong: action.payload
            };
        case SET_FAVE_ID_LIST: 
            return {
                ...state,
                faveIdList: action.payload
            };
        case ADD_TO_FAVE_ID_LIST: 
            return {
                ...state,
                faveIdList: [action.payload, ...state.faveIdList]
            };
        case REMOVE_FROM_FAVE_ID_LIST: 
            return {
                ...state,
                faveIdList: state.faveIdList.filter((id) => id !== action.payload)
            };
        case SET_USER_FAVES: 
            return {
                ...state,
                userFaves: action.payload
            };
        case LOG_OUT: 
            return initialState
            
        default:
            return state;
    }
}