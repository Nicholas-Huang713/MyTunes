import React, {useState, useEffect} from 'react'
//redux
import {playSong, 
        setPlaying, 
        setCurrentSong, 
        setPause, 
        setFaveIdList,
        addToFaveIdList,
        removeFromFaveIdList} from '../../store/actions/songActions';
import { useSelector, useDispatch } from 'react-redux';
//styles ui
import './Playlist.scss';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import sound from '../../images/sound.gif'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PauseIcon from '@material-ui/icons/Pause';
//firebase
import firebase from '../../firebase/firebase';
import {addFaves, removeFaves} from '../../firebase/fireApi';

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  }
});

export default function Playlist({songList}) {
    const classes = useStyles();
    //local state
    const [currentItemHovered, setCurrentItemHovered] = useState(null);
    //redux
    const dispatch = useDispatch();
    const compareSong = useSelector(state => state.song.compareSong);
    const faveIdList = useSelector(state => state.song.faveIdList);

    useEffect(() => {
        const getFaveList = firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                firebase.firestore().collection('playlists').doc(user.uid).get()
                    .then((data) => {
                        if(data){
                            const faveList = data.data().liked;
                            const idList = faveList.map(song => song.id);
                            dispatch(setFaveIdList(idList));
                        }
                    }).catch(err => console.log(err)); 
            } 
        })
        return () => {
            getFaveList();
        }
    }, [songList, dispatch, faveIdList])

    const handleSelectSong = (song) => {
        dispatch(playSong(song));
        dispatch(setPlaying());
        dispatch(setCurrentSong(song));
    }

    const handlePauseSong = () => {
        dispatch(setPause());
        dispatch(setCurrentSong(null));
    }

    const handleLikeSong = (song) => {
        dispatch(addToFaveIdList(song.id));
        addFaves(song);
    }

    const handleUnlikeSong = (id) => {
        dispatch(removeFromFaveIdList(id));
        removeFaves(id);
    }
    
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead className="playlist-table-header">
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="left">Album</TableCell>
                        <TableCell align="left">Like</TableCell>
                        <TableCell align="left">Duration</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {songList.map((song, index) => (
                        <TableRow 
                            key={song.id} 
                            className="playlist-table-row" 
                            onMouseEnter={() => setCurrentItemHovered(song.id)} 
                            onMouseLeave={() => setCurrentItemHovered(null)}
                            onDoubleClick= {() => handleSelectSong(song)}
                        >
                            <TableCell component="th" scope="row">
                                <Grid 
                                    container 
                                    spacing={2}
                                    justify="flex-start"
                                    alignItems="center"
                                    wrap="nowrap"
                                >
                                    <Grid item>
                                        {compareSong && compareSong.id === song.id ? (
                                            currentItemHovered === song.id ? (
                                                    <PauseIcon onClick={() => handlePauseSong()}/>
                                                ) : (
                                                    compareSong.id === song.id ? 
                                                    <img src={sound} alt="playing song icon" className="sound-wave" />
                                                    :
                                                    <PlayArrowIcon onClick={() => handleSelectSong(song)}/>
                                                )
                                        ) : (
                                            currentItemHovered === song.id ? (
                                                <PlayArrowIcon onClick={() => handleSelectSong(song)}/>
                                            ) : (
                                                <Typography>{index + 1}</Typography>
                                            )
                                        )} 
                                    </Grid>
                                    <Grid item><img src={song.album.cover_small} alt="album cover"/></Grid>
                                    <Grid item>
                                        <Typography><b>{song.title}</b></Typography>
                                        <Typography>{song.artist.name}</Typography>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell align="left"><Typography>{song.album.title}</Typography></TableCell>
                            <TableCell align="left">
                                {faveIdList.includes(song.id) ? 
                                    <FavoriteIcon onClick={() => handleUnlikeSong(song.id)}/>
                                    :
                                    <FavoriteBorderIcon onClick={() => handleLikeSong(song)}/>
                                }
                            </TableCell>
                            <TableCell align="left">
                                {`${song.duration.toString()[0]} : ${song.duration.toString()[1]}${song.duration.toString()[2]}`}</TableCell>
                        </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}
