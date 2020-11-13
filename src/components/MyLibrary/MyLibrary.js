import React, {useEffect, useState} from 'react'
import Playlist from '../Playlist/Playlist';
import firebase from '../../firebase/firebase';

export default function MyLibrary() {
    const [faveList, setFaveList] = useState([]);

    const db = firebase.firestore();
    const auth = firebase.auth();

    useEffect(() => {
        const getFaveList = auth.onAuthStateChanged((user) => {
            if(user) {
                db.collection('playlists').doc(user.uid).get()
                    .then((data) => {
                        if(data) {
                            const currentList = data.data().liked;
                            setFaveList(currentList);
                        } 
                    }).catch(err => console.log(err)); 
            } 
        })
        return () => {
            getFaveList();
        }
    }, [faveList ,auth, db])
    
    return (
        
        <>
            <Playlist songList={faveList} isUserList={true} />
        </>
    )
}
