import React, {useEffect, useContext, useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { UserContext } from '../../providers/UserProvider';
import {addUserPlaylistToFaves, removeUserPlaylistFromFaves} from '../../firebase/fireApi';
import firebase from '../../firebase/firebase';

export default function UserPlaylistHeader({songList}) {
    const loggedUser = useContext(UserContext);
    const [faveIdList, setFaveIdList] = useState([]);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                firebase.firestore().collection('users').doc(user.uid).get()
                    .then((data) => {
                        if(data) {
                            const list = data.data().favePlaylistIds;
                            setFaveIdList(list);
                        } 
                    }).catch(err => console.log(err)); 
            } 
        })
    }, [faveIdList])

    return (
        <Container>
            <Grid 
                container
                spacing={2}
                alignItems="center"
            >
                {songList.name &&
                <>
                    <Grid item>
                        <img src={songList.liked[0].album.cover_medium} alt="album cover"/>
                    </Grid>
                    <Grid item>
                        <h1>Favorites</h1>
                        by {songList.name}
                        <br/>
                        {songList.userId !== loggedUser.id &&
                            (faveIdList.includes(songList.userId) ?
                                <FavoriteIcon 
                                    style={{ fontSize: 45 }}
                                    onClick={() => removeUserPlaylistFromFaves(songList.userId)}
                                />
                                :
                                <FavoriteBorderIcon  
                                    style={{ fontSize: 45 }}
                                    onClick={() => addUserPlaylistToFaves(songList.userId)}
                                />
                            )
                             
                        }
                    </Grid>
                </>
                }
            </Grid>
        </Container>
    )
}
