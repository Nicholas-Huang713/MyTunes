import React, {useState, useEffect} from 'react';
import Song from '../Song/Song';
import firebase from '../../firebase/firebase';
import {searchMusic, playSong} from '../../store/actions/songActions';
import { useSelector, useDispatch} from 'react-redux';

export default function Dashboard() {
    const searchList = useSelector(state => state.song.searchList);
    const [inputText, setInputText] = useState('');
    const dispatch = useDispatch();

    // useEffect(() => {
    // const unsubscribe = firebase
    // .firestore().collection('favorites').onSnapshot((snapshot) => {
    //     const faves = snapshot.docs.map((song) => ({
    //         songId: song.songId,
    //         ...song.data()
    //     }))
    //     setFaveList(faves);
    // })
    //     return () => {
    //         unsubscribe();
    //     }
    // }, [])

    const handleKeyUp = (e) => {
        e.preventDefault();
        if(e.key === 'Enter') {
            e.preventDefault();
            dispatch(searchMusic(inputText));
            setInputText('');
        }
    }

    const handleSelectSong = (song) => {
        dispatch(playSong(song));
    }

    
    
    return (
        <div>
            <h1> Music Search</h1>
            <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Search Artist or Song"
                onKeyUp={handleKeyUp}
            />

            <ul>
                {searchList.map((song) => (
                <li key={song.id}>
                    <Song song={song} handleSelectSong={handleSelectSong} />
                </li>
                ))}
            </ul>
            
         </div>
    )
}
