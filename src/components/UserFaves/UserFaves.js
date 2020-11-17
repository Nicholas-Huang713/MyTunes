import React, {useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import Playlist from '../Playlist/Playlist';
import UserPlaylistHeader from '../UserPlaylistHeader/UserPlaylistHeader';
import { useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { UserContext } from '../../providers/UserProvider';

export default function UserFaves() {
    const userFaves = useSelector(state => state.song.userFaves);
    const loggedUser = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if(!loggedUser) {
            history.push('/')
        }
    }, [loggedUser, history])
    return (
        <>
            {userFaves.liked &&
                <Grid container direction="column">
                    <Grid item><UserPlaylistHeader songList={userFaves}/></Grid>
                    <Grid item><Playlist songList={userFaves.liked}/></Grid>            
                </Grid>
            }
        </>
    )
}
