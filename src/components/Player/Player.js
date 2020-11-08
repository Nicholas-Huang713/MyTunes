import React, {useState} from 'react'
import firebase from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));


export default function Player({currentSong}) {
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleLikeClick = (e) => {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
        firebase
            .firestore()
            .collection('favorites')
            .add({
                songId: currentSong.id,
                title: currentSong.title,
                preview: currentSong.preview,
                artist: currentSong.artist.name,
                cover: currentSong.album.cover_big
            })
            .then(() => {
                
            })
    }
    const classes = useStyles();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <h3>{currentSong.title}</h3>
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
        </div>
    )
}
