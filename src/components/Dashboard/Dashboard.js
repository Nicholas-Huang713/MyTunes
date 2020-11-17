import React, {useState, useEffect, useContext} from 'react';
//router
import {Link} from 'react-router-dom';
//firebase
import firebase from '../../firebase/firebase';
import {checkAndCreateUser} from '../../firebase/fireApi';
//redux
import { useDispatch } from 'react-redux';
import {setUserFaves} from '../../store/actions/songActions'
//context
import { UserContext } from '../../providers/UserProvider';
//history
import { useHistory } from "react-router-dom";
//UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', 
    marginLeft: '5%',
    marginRight: '5%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Dashboard() {
    const classes = useStyles();
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [currentItemHovered, setCurrentItemHovered] = useState(null);
    const [redirect, setRedirect] = useState(null);
    const [faveIdList, setFaveIdList] = useState([]);
    const dispatch = useDispatch();
    const loggedUser = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!loggedUser) {
            setRedirect("/");
        } else {
            console.log(loggedUser.uid)
        }
    }, [loggedUser]);

    if (redirect) history.push(redirect);

    useEffect(() => {
        checkAndCreateUser();
    }, [])

    useEffect(() => {
        firebase.firestore().collection('playlists').get()
            .then((data) => {
                if(data) {
                    let userList = [];
                    data.forEach(doc => {
                        userList.push(doc.data())
                    })
                    setUserPlaylists(userList);
                    console.log(userList);
                }
            })
        return () => {
        }
    }, [])

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                firebase.firestore().collection('users').doc(user.uid).get()
                    .then((data) => {
                        if(data) {
                            const list = data.data().favePlaylistIds;
                            setFaveIdList(list);
                        } 
                    }).catch(err => console.log(err)); 
            } 
        })
    }, [faveIdList])
     
    return (
        <div>
            {faveIdList.length > 0 && <h1> Favorite Playlists</h1>}
            <Grid container spacing={5}>
                { userPlaylists.length > 0 && 
                    userPlaylists.map(user => (
                        (user.userId !== loggedUser.id && user.liked.length > 0 && faveIdList.includes(user.userId)) &&
                        <Grid item key={user.userId}>
                            <Card 
                                className={classes.root}
                                onMouseEnter={() => setCurrentItemHovered(user.userId)} 
                                onMouseLeave={() => setCurrentItemHovered(null)}
                             >
                                <Link to="/userfaves" onClick={() => dispatch(setUserFaves(user))}><img src={user.liked[0].album.cover_medium} alt="playlist cover" /></Link>
                                <CardContent>
                                    <Grid 
                                        container
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                By {user.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            {currentItemHovered === user.userId &&
                                                <PlayCircleFilledIcon />
                                            }
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    )) 
                }
            </Grid>
            <br/>
            {userPlaylists.length > 0 && <h1>User Playlists</h1>}
            <Grid container spacing={5}>
                { userPlaylists.length > 0 && 
                    userPlaylists.map(user => (
                        (user.userId !== loggedUser.id && user.liked.length > 0) &&
                        <Grid item key={user.userId}>
                            <Card 
                                className={classes.root}
                                onMouseEnter={() => setCurrentItemHovered(user.userId)} 
                                onMouseLeave={() => setCurrentItemHovered(null)}
                            >
                                <Link to="/userfaves" onClick={() => dispatch(setUserFaves(user))}><img src={user.liked[0].album.cover_medium} alt="playlist cover" /></Link>
                                <CardContent>
                                    <Grid 
                                        container
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                By {user.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            {currentItemHovered === user.userId &&
                                                <PlayCircleFilledIcon />
                                            }
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    )) 
                }
            </Grid>
        </div>
    )
}
