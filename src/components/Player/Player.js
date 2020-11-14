import React, {useState, useContext, useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';
//UI
import './Player.scss';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import LinearProgress from '@material-ui/core/LinearProgress';
import './Player.scss';
//redux
import { useSelector, useDispatch } from 'react-redux';
import {setPlaying, setPause, setCurrentSong, addToFaveIdList, removeFromFaveIdList} from '../../store/actions/songActions'
//firebase
import {addFaves, removeFaves} from '../../firebase/fireApi';
import { UserContext } from '../../providers/UserProvider';

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    play: {
        width: "100px"
    },
    like: {
        color: "white"
    },
    typography: {
       padding: theme.spacing(2),
    },
    appBar: {
      top: 'auto',
      bottom: 0,
      background: '#2E3B55'
    },
    grow: {
      flexGrow: 1,
    },
  }));

export default function Player() {
    const audioRef = useRef(null);
    //redux
    const dispatch = useDispatch();
    const currentSong = useSelector(state => state.song.currentSong);
    const loggedUser = useContext(UserContext);
    const playing = useSelector(state => state.song.playing);
    const faveIdList = useSelector(state => state.song.faveIdList);
    //local state
    const [anchorEl, setAnchorEl] = useState(null);
    // const [currentSong, setCurrentSong] = useState({});
    const [progress, setProgress] = useState(0);
    const classes = useStyles();

    useEffect(() => {
        if(audioRef && audioRef.current) {
            if(playing) audioRef.current.play();
            else audioRef.current.pause();
        }
    }, [playing])

    useInterval(() => {
        if(audioRef && audioRef.current) {
            const {currentTime, duration} = audioRef.current;
            setProgress(Math.ceil((currentTime * 100) / duration));
        }
    })

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handlePauseClick = () => {
        dispatch(setPause());
        dispatch(setCurrentSong(null));
    }

    const handlePlayClick = (song) => {
        dispatch(setPlaying());
        dispatch(setCurrentSong(song));
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
        <>
            {loggedUser &&
                <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar>
                        <Grid 
                            container
                            spacing={10}
                            justify="space-between"
                            alignItems="center"
                            wrap="nowrap"
                        >
                            <Grid item>
                                <Grid 
                                    container 
                                    spacing={2}
                                    justify="center"
                                    alignItems="center"
                                    wrap="nowrap"
                                >
                                    {currentSong.title &&
                                        <>
                                            <Grid item><img src={currentSong.album.cover_small} alt="album cover"/></Grid>
                                            <Grid item>
                                                <Typography><b>{currentSong.title}</b></Typography>
                                                <Typography>{currentSong.artist.name}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button>
                                                    {faveIdList.includes(currentSong.id) ? 
                                                        <FavoriteIcon onClick={() => handleUnlikeSong(currentSong.id)} className={classes.like}/> 
                                                        : 
                                                        <FavoriteBorderIcon onClick={() => handleLikeSong(currentSong)} className={classes.like}/>
                                                    }
                                                </Button>
                                                <Popover
                                                    id={id}
                                                    open={open}
                                                    anchorEl={anchorEl}
                                                    onClose={handleClose}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                    }}
                                                >
                                                    <Typography className={classes.typography}>Liked Song.</Typography>
                                                </Popover>
                                            </Grid>
                                        </>
                                    }
                                    
                                </Grid>
                                    
                            </Grid>
                            <Grid item>
                                <audio 
                                    src={currentSong.title && currentSong.preview} 
                                    ref={audioRef} 
                                    // onPause={}
                                    onEnded={() => handlePauseClick()}
                                    autoPlay
                                />
                                {currentSong.title? (
                                    playing ? 
                                        <PauseCircleOutlineIcon onClick={() => handlePauseClick()} className="player-play-btn" />
                                        : 
                                        <PlayCircleOutlineIcon onClick={() => handlePlayClick(currentSong)} className="player-play-btn"/>
                                ) : (
                                    <></>
                                )} 
                                <br />
                                <div className={classes.root}>
                                    <LinearProgress variant="determinate" value={progress}/>
                                    {/* {`${progress}%`} */}
                                </div>
                            </Grid>
                            <Grid item> 
                                
                                
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            }
        </>
    )
}
