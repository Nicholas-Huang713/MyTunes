import React, {useState, useEffect, useContext} from 'react';
import firebase from '../../firebase/firebase';
import {checkAndCreateUser} from '../../firebase/fireApi';
import { useDispatch } from 'react-redux';
import { UserContext } from '../../providers/UserProvider';
import { useHistory } from "react-router-dom";
import {notHome} from '../../store/actions/pageActions';

export default function Dashboard() {
    
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
    }, [loggedUser, dispatch]);

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

   
    
    return (
        <div>
            <h1> User Playlists</h1>
            {/* <ul>
                {searchList.map((song) => (
                <li key={song.songId}>
                    <Song song={song} handleSelectSong={handleSelectSong} />
                </li>
                ))}
            </ul> */}
            
         </div>
    )
}
