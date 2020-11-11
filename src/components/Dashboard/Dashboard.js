import React, {useState, useEffect, useContext} from 'react';
import Song from '../Song/Song';
import firebase from '../../firebase/firebase';
import {checkAndCreateUser} from '../../firebase/fireApi';
import {playSong} from '../../store/actions/songActions';
import { useSelector, useDispatch } from 'react-redux';
import { UserContext } from '../../providers/UserProvider';
import { useHistory } from "react-router-dom";
import {notHome} from '../../store/actions/pageActions';

export default function Dashboard() {
    const searchList = useSelector(state => state.song.searchList);
    const [faveList, setFaveList] = useState([]);
    const dispatch = useDispatch();

    const loggedUser = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);

    const history = useHistory();
    useEffect(() => {
        dispatch(notHome());
        if (loggedUser === null) {
            setRedirect("/");
        }
    }, [loggedUser]);

    if (redirect) history.push(redirect);

    useEffect(() => {
        checkAndCreateUser();
    }, [])

    useEffect(() => {
    const subscribeFaves = firebase
        .firestore().collection('favorites').onSnapshot((snapshot) => {
            const faves = snapshot.docs.map((song) => ({
                songId: song.songId,
                ...song.data()
            }))
            setFaveList(faves);
        })
        return () => {
            subscribeFaves();
        }
    }, [])

    const handleSelectSong = (song) => {
        dispatch(playSong(song));
    }
    
    return (
        <div>
            <h1> Music Search</h1>
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
