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
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
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
    progressBar: {
        padding: '10px 0 10px 0'
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
      background: '#2E3B55',
      padding: '5px'
    },
    grow: {
      flexGrow: 1,
    },
  }));

export default function Player() {
    const audioRef = useRef(null);
    const classes = useStyles();
    //redux
    const dispatch = useDispatch();
    const currentSong = useSelector(state => state.song.currentSong);
    const loggedUser = useContext(UserContext);
    const playing = useSelector(state => state.song.playing);
    const faveIdList = useSelector(state => state.song.faveIdList);
    //local state
    const [anchorEl, setAnchorEl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(30);

    useEffect(() => {
        if(audioRef && audioRef.current) {
            if(playing) audioRef.current.play();
            else audioRef.current.pause();
        }
    }, [playing])

    // useEffect(() => {
    //     if(audioRef && audioRef.current) {
    //         audioRef.current.currentTime = pr
    //     }
    // }, [progress])

    useEffect(() => {
        if(audioRef && audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume])

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

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
    };

    const handleProgressChange = (event, newValue) => {
        setProgress(newValue);
    };


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
                            <Grid item xs>
                                <Grid 
                                    container 
                                    spacing={1}
                                    justify="center"
                                    alignItems="center"
                                    wrap="nowrap"
                                >
                                    {currentSong.title &&
                                        <>
                                            <Grid item><img src={currentSong.album.cover_small} alt="album cover"/></Grid>
                                            <Grid item>
                                                <b>{currentSong.title}</b>
                                                <br/>{currentSong.artist.name}
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
                            <Grid item xs={8} sm={6}>
                                <audio 
                                    src={currentSong.title && currentSong.preview} 
                                    ref={audioRef} 
                                    onEnded={() => handlePauseClick()}
                                    autoPlay
                                />
                                <Grid 
                                    container 
                                    spacing={4}
                                    justify="center"
                                    alignItems="center"
                                    wrap="nowrap"
                                >
                                    <Grid item><SkipPreviousIcon /></Grid>
                                    <Grid item>
                                        {currentSong.title? (
                                            playing ? 
                                                <PauseCircleOutlineIcon onClick={() => handlePauseClick()} fontSize="large" />
                                                : 
                                                <PlayCircleOutlineIcon onClick={() => handlePlayClick(currentSong)} fontSize="large"/>
                                        ) : (
                                            <PlayCircleOutlineIcon fontSize="large"/>
                                        )} 
                                    </Grid>
                                    <Grid item><SkipNextIcon/></Grid>
                                </Grid>
                                <div className={classes.progressBar}>
                                    <LinearProgress variant="determinate" value={progress}/>
                                </div>
                                
                            </Grid>
                            <Grid item xs>
                                <div className={classes.root}>
                                    <Grid container spacing={2} wrap="nowrap">
                                        <Grid item>
                                            <VolumeDown />
                                        </Grid>
                                        <Grid item xs>
                                            {currentSong.title ? 
                                                <Slider value={volume} onChange={handleVolumeChange} aria-labelledby="continuous-slider" />
                                                :
                                                <Slider disabled defaultValue={30} aria-labelledby="disabled-slider" />
                                            }
                                        </Grid>
                                    </Grid>
                                </div>                         
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            }
        </>
    )
}
