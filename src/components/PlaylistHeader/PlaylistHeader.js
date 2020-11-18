import React, {useState, useEffect} from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import './PlaylistHeader.scss';

export default function PlaylistHeader({songList}) {
    const [coverList, setCoverList] = useState([]);
    const [artistName, setArtistName] = useState('');

    useEffect(() => {
        if(songList.length >= 4) {
            grabRandomCovers();
            setArtistName(songList[0].artist.name);
        }
    }, [songList])
    
    const grabRandomCovers = () => {
        let currentIndex = songList.length;
        let covers = songList.map((song) => song.album.cover_small);
        let randomCovers = [];
        for(let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            randomCovers.push(covers[randomIndex]);
            covers = covers.filter((song, index) => +index !== +randomIndex);
            currentIndex--;
        }
        setCoverList(randomCovers);
    }
    if(!songList) {
        return (<></>)
    }
    return (
        <Container className="playlist-header-wrapper">
            <Grid    
                container
                spacing={2}
                alignItems="center"
            >
                {coverList !== [] &&
                    <Grid item>
                        <Grid container direction="column">
                            <Grid item>
                                <img src={coverList[0]} alt="album cover" />
                                <img src={coverList[1]} alt="album cover"/>
                            </Grid>
                            <Grid item>
                                <img src={coverList[2]} alt="album cover" />
                                <img src={coverList[3]} alt="album cover" />
                            </Grid>
                        </Grid>
                    </Grid>
                }
                <Grid item>
                    <h1>{artistName}</h1>
                </Grid>
            </Grid>
        </Container>
    )
}
