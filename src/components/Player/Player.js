import React, {useState} from 'react'
import {addFaves} from '../../firebase/fireApi';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const useStyles = makeStyles((theme) => ({
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
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleLikeClick = (e) => {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
        addFaves(currentSong);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const classes = useStyles();
    const currentSong = useSelector(state => state.song.currentSong);
    
    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                {currentSong.title}
                <audio src={currentSong.preview} controls autoPlay></audio>
                <Button onClick={(e) => handleLikeClick(e)}>Like</Button>
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
            </Toolbar>
        </AppBar>
    )
}
