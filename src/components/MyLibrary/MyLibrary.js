import React, {useEffect, useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Playlist from '../Playlist/Playlist';
import firebase from '../../firebase/firebase';
import { Typography } from '@material-ui/core';
import UserPlaylistHeader from '../UserPlaylistHeader/UserPlaylistHeader';
import Grid from '@material-ui/core/Grid';
import { UserContext } from '../../providers/UserProvider';

export default function MyLibrary() {
    const [userPlaylist, setUserPlaylist] = useState({});
    const loggedUser = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if(!loggedUser) {
            history.push('/');
        }
    }, [loggedUser, history])

    useEffect(() => {
        const getFaveList = firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                firebase.firestore().collection('playlists').doc(user.uid).get()
                    .then((data) => {
                        if(data) {
                            const userPlaylistData = data.data();
                            setUserPlaylist(userPlaylistData);
                        } 
                    }).catch(err => console.log(err)); 
            } else return;
        })
        return () => {
            getFaveList();
        }
    }, [userPlaylist])
    
    return (
        <>
            {userPlaylist.liked ? (
                <Grid container direction="column">
                    <Grid item><UserPlaylistHeader songList={userPlaylist}/></Grid>
                    <Grid item><Playlist songList={userPlaylist.liked}/></Grid>            
                </Grid>
            ) : (
                <Typography>0 Liked Songs</Typography>
            )}
        </>
    )
}
