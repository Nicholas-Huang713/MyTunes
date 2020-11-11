import React, {useState, useEffect, useContext} from 'react';
import Song from '../Song/Song';
import firebase from '../../firebase/firebase';
import {playSong} from '../../store/actions/songActions';
import { useSelector, useDispatch } from 'react-redux';
import { UserContext } from '../../providers/UserProvider';
import { useHistory } from "react-router-dom";
import {notHome} from '../../store/actions/pageActions';

export default function Dashboard() {
    const searchList = useSelector(state => state.song.searchList);
    const [faveList, setFaveList] = useState([]);
    const dispatch = useDispatch();

    const user = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);

    const history = useHistory();
    useEffect(() => {
        dispatch(notHome());
        if (user === null) {
            setRedirect("/");
        }
    }, [user]);

    if (redirect) history.push(redirect);
    

    useEffect(() => {
    const unsubscribe = firebase
    .firestore().collection('favorites').onSnapshot((snapshot) => {
        const faves = snapshot.docs.map((song) => ({
            songId: song.songId,
            ...song.data()
        }))
        console.log(faves);
        setFaveList(faves);
    })
        return () => {
            unsubscribe();
        }
    }, [])

    

    const handleSelectSong = (song) => {
        dispatch(playSong(song));
    }
    
    return (
        <div>
            <h1> Music Search</h1>
            {/* <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Search Artist or Song"
                onKeyUp={handleKeyUp}
            /> */}
            {/* <ul>
                {faveList.map((song) => (
                    <li key={song.songId}>{song.songId} {song.title}</li>
                ))}
            </ul> */}
            <ul>
                {searchList.map((song) => (
                <li key={song.songId}>
                    <Song song={song} handleSelectSong={handleSelectSong} />
                </li>
                ))}
            </ul>
            
         </div>
    )
}
