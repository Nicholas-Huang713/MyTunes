import {PLAY_SONG, SEARCH_MUSIC} from './types';
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
        console.log("Searched Songs: " + songList);
        dispatch({
            type: SEARCH_MUSIC,
            payload: songList
        })
    }).catch((error) => {
        console.error(error);
    });
};

export const playSong = (songDetails) => dispatch => {
    dispatch({
        type: PLAY_SONG,
        payload: songDetails
    })
}   


// export const fetchTodos = () => (dispatch, getState, {getFirebase, getFirestore}) => {
//     fetch('https://jsonplaceholder.typicode.com/todos')
//     .then(res => res.json())
//     // .then(data => console.log(data))
//     .then(todos => 
//         dispatch({
//             type: FETCH_TODOS,
//             payload: todos.reverse()
//         })
//     );
// };

