import React, {useEffect, useState} from 'react'
import Playlist from '../Playlist/Playlist';
import firebase from '../../firebase/firebase';
import { Typography } from '@material-ui/core';
import UserPlaylistHeader from '../UserPlaylistHeader/UserPlaylistHeader';
import Grid from '@material-ui/core/Grid';

export default function MyLibrary() {
    const [faveList, setFaveList] = useState([]);
    const [userPlaylist, setUserPlaylist] = useState({});

    useEffect(() => {
        const getFaveList = firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                firebase.firestore().collection('playlists').doc(user.uid).get()
                    .then((data) => {
                        if(data) {
                            // const userPlaylistData = data.data().liked;
                            const userPlaylistData = data.data();
                            // setFaveList(currentList);
                            setUserPlaylist(userPlaylistData);
                        } 
                    }).catch(err => console.log(err)); 
            } else return;
        })
        return () => {
            getFaveList();
        }
    }, [faveList])
    
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
