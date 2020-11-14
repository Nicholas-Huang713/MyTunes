import React, {useEffect, useState} from 'react'
import Playlist from '../Playlist/Playlist';
import firebase from '../../firebase/firebase';
import { Typography } from '@material-ui/core';

export default function MyLibrary() {
    const [faveList, setFaveList] = useState([]);

    useEffect(() => {
        const getFaveList = firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                firebase.firestore().collection('playlists').doc(user.uid).get()
                    .then((data) => {
                        if(data) {
                            // console.log(data.data())

                            const currentList = data.data().liked;
                            setFaveList(currentList);
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
            {(faveList.length > 0)? (
                <Playlist songList={faveList} />
            ) : (
                <Typography>0 Liked Songs</Typography>
            )}
        </>
    )
}
