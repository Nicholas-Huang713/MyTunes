import React, {useEffect} from 'react'
import Playlist from '../Playlist/Playlist';
import UserPlaylistHeader from '../UserPlaylistHeader/UserPlaylistHeader';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';

export default function UserFaves() {
    const userFaves = useSelector(state => state.song.userFaves);
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
