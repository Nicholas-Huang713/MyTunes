import React, {useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Playlist from '../Playlist/Playlist';
import PlaylistHeader from '../PlaylistHeader/PlaylistHeader';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { UserContext } from '../../providers/UserProvider';

export default function SearchData() {
    const searchList = useSelector(state => state.song.searchList);
    const history = useHistory();
    const loggedUser = useContext(UserContext)

    useEffect(() => {
        if(!loggedUser) {
            history.push('/');
        }
    }, [loggedUser, history])

    return (
        <Grid container direction="column">
            <Grid item><PlaylistHeader songList={searchList}/></Grid>
            <Grid item><Playlist songList={searchList} /></Grid>            
        </Grid>    
    )
}
 