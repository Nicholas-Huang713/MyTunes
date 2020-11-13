import React from 'react'
import Playlist from '../Playlist/Playlist';
import { useSelector } from 'react-redux';

export default function SearchData() {
    const searchList = useSelector(state => state.song.searchList);
    return (
        <>
            <Playlist songList={searchList} />
        </>    
    )
}
 