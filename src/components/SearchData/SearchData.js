import React from 'react'
import Playlist from '../Playlist/Playlist';
import PlaylistHeader from '../PlaylistHeader/PlaylistHeader';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';

export default function SearchData() {
    const searchList = useSelector(state => state.song.searchList);
    return (
        <Grid container direction="column">
            <Grid item><PlaylistHeader songList={searchList}/></Grid>
            <Grid item><Playlist songList={searchList} /></Grid>            
        </Grid>    
    )
}
 