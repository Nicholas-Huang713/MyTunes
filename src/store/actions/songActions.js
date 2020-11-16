import {LOG_OUT, PLAY_SONG, SEARCH_MUSIC, SET_PLAYING, SET_PAUSE, SET_CURRENT_SONG, SET_FAVE_ID_LIST, ADD_TO_FAVE_ID_LIST, REMOVE_FROM_FAVE_ID_LIST, SET_USER_FAVES} from './types';
import axios from 'axios';

export const searchMusic = (inputText) => dispatch => {
    const options = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: {q: inputText},
        headers: {
          'x-rapidapi-key': '97b3d67fd7msh8ae0214eedae588p157a2cjsn1de270448a3e',
          'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };
    axios.request(options).then((res) => {
        const songList = res.data.data;
        dispatch({
            type: SEARCH_MUSIC,
            payload: songList
        })
    }).catch((error) => {
        console.error(error);
    });
};

//play song from playlist and set current song
export const playSong = (songDetails) => dispatch => {
    dispatch({
        type: PLAY_SONG,
        payload: songDetails
    })
}   

//set true or false value and set current song
export const setPlaying = () => dispatch => {
    dispatch({
        type: SET_PLAYING,
    })
}

//set pause
export const setPause = () => dispatch => {
    dispatch({
        type: SET_PAUSE,
    })
}

export const setCurrentSong = (songDetails) => dispatch => {
    dispatch({
        type: SET_CURRENT_SONG,
        payload: songDetails
    })
}
export const setFaveIdList = (idList) => dispatch => {
    dispatch({
        type: SET_FAVE_ID_LIST,
        payload: idList
    })
}
export const addToFaveIdList = (id) => dispatch => {
    dispatch({
        type: ADD_TO_FAVE_ID_LIST,
        payload: id
    })
}
export const removeFromFaveIdList = (id) => dispatch => {
    dispatch({
        type: REMOVE_FROM_FAVE_ID_LIST,
        payload: id
    })
}

export const logOut = () => dispatch => {
    dispatch({
        type: LOG_OUT
    })
}

export const setUserFaves = (playlist) => dispatch => {
    dispatch({
        type: SET_USER_FAVES,
        payload: playlist
    })
}