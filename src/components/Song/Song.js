import React from 'react'
import './Song.css';
// import Like from './Like/Like';

import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    image: {
      position: 'relative',
      height: 200,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.1,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
            opacity: '0.7',
            color: 'black',
            border: '2px solid white',
            background: 'white'
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  }));

export default function Song({song, handleSelectSong}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
      
            <ButtonBase
                focusRipple
                key={song.title}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                    width: '50%'
                }}
                onClick={() => handleSelectSong(song)}
            >
            <span
                className={classes.imageSrc}
                style={{
                    backgroundImage: `url(${song.album.cover_big})`,
                }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
                <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    className={classes.imageTitle}
                >
                    <h3>{song.title}</h3>
                    <h5>{song.album.title}</h5>
                    {song.artist.name}
                    
                </Typography>
            </span>
            </ButtonBase>
        </div>
    )
}
