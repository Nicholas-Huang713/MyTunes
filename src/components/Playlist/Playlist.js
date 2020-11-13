import React, {useState, useEffect, useContext} from 'react'
//redux
import {playSong} from '../../store/actions/songActions';
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
//firebase
import firebase from '../../firebase/firebase';
import {addFaves, removeFaves} from '../../firebase/fireApi';

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
});

export default function Playlist({songList}) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [faveList, setFaveList] = useState([]);
    const [currentItemHovered, setCurrentItemHovered] = useState(null);
    const [isPlaying, setIsPlaying] = useState(null);

    const db = firebase.firestore();
    const auth = firebase.auth();

    useEffect(() => {
        const getFaveList = auth.onAuthStateChanged((user) => {
            if(user) {
                db.collection('playlists').doc(user.uid).get()
                    .then((data) => {
                        const faveList = data.data().liked;
                        if(!faveList) {
                            return;
                        } else {
                            const faveIdList = faveList.map(song => song.id);
                            setFaveList(faveIdList);
                        }
                    }).catch(err => console.log(err)); 
            }
        })
        return () => {
            getFaveList();
        }
    }, [faveList ,auth, db])

    const handleSelectSong = (song) => {
        dispatch(playSong(song));
        setIsPlaying(song.id)
    }
    
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell >Title</TableCell>
                        <TableCell align="left">Album</TableCell>
                        <TableCell align="left">Like</TableCell>
                        <TableCell align="left">Duration</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {songList.map((song, index) => (
                        <TableRow key={song.id} className="playlist-table-row" onMouseEnter={() => setCurrentItemHovered(song.id)} onMouseLeave={() => setCurrentItemHovered(null)}>
                            <TableCell component="th" scope="row" >
                                <Grid 
                                    container 
                                    spacing={2}
                                    justify="flex-start"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        {isPlaying === song.id ? (
                                                <img src={sound} alt="playing song icon" className="sound-wave" />
                                            ) : (
                                                currentItemHovered === song.id ? 
                                                    <PlayArrowIcon onClick={() => handleSelectSong(song)}/>
                                                    :
                                                    <Typography>{index + 1}</Typography>
                                            )
                                        }    



                                        {/* {currentItemHovered === song.id ? (
                                                isPlaying === song.id ?  : <PlayArrowIcon onClick={() => handleSelectSong(song)}/>
                                            ) : ( 
                                            <Typography>{index + 1}</Typography>
                                            )
                                        }  */}
                                         
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
                                {faveList.includes(song.id) ? 
                                    <button onClick={() => removeFaves(song.id)}>Unlike</button> 
                                    :
                                    <button onClick={() => addFaves(song)}>Like</button>
                                }
                            </TableCell>
                            <TableCell align="left">{song.duration}</TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}
