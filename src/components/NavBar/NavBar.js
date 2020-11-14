import React, {useState, useContext} from 'react'
import './NavBar.scss';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import firebase from '../../firebase/firebase';
import {UserContext} from '../../providers/UserProvider';
import { useHistory, Link } from "react-router-dom";
import {searchMusic} from '../../store/actions/songActions';
import SideNav from '../SideNav/SideNav';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },

  grow: {
      flexGrow: 1,
      background: "white"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));

export default function NavBar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const homePage = useSelector(state => state.page.homePage);
    const [inputText, setInputText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const loggedUser = useContext(UserContext);
    const history = useHistory();

    const handleSignOut = () => {
      firebase.auth().signOut()
      .then(() => {
        console.log("Logged Out")
        handleMenuClose();
        history.push('/');
      }).catch(err => console.log(err.message));
    }

    const handleBtnClick = (redirect) => {
      handleMenuClose();
      history.push(redirect)
    }
   
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleBtnClick('/profile')}>Profile</MenuItem>
        <MenuItem onClick={() => handleBtnClick('/dashboard')}>Dashboard</MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';

    let renderMobileMenu;
    if(loggedUser) {
      renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={() => handleBtnClick('/profile')}>
              <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              >
              <AccountCircle />
              </IconButton>
              <p>Profile</p>
          </MenuItem>
          <MenuItem onClick={() => handleBtnClick('/dashboard')}>
            <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
                <MailIcon />
            </Badge>
            </IconButton>
            <p>Dashboard</p>
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
              <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge badgeContent={11} color="secondary">
                  <NotificationsIcon />
              </Badge>
              </IconButton>
              <p>Logout</p>
          </MenuItem>
        </Menu>
      );
    } else {
      renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={() => handleBtnClick('/register')}>
              <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              >
              <AccountCircle />
              </IconButton>
              <p>Register</p>
          </MenuItem>
          <MenuItem onClick={() => handleBtnClick('/login')}>
            <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
                <MailIcon />
            </Badge>
            </IconButton>
            <p>Login</p>
          </MenuItem>
        </Menu>
      )
    }

    const handleKeyUp = (e) => {
      e.preventDefault();
      if(e.key === 'Enter') {
          e.preventDefault();
          dispatch(searchMusic(inputText));
          setInputText('')
          history.push('/search');
      }
    }

    const linkStyles = {
      textDecoration: 'none', 
      color: 'white'
    }
    
    return (
        <div className={classes.grow}>
            <AppBar className={classes.appBar} style={{ background: '#2E3B55'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                       <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>MyTunes</Link> 
                    </Typography>
                    <div className={classes.search}>
                        {loggedUser && 
                          <>
                            <div className={classes.searchIcon} >
                                <SearchIcon />
                            </div>
                            <InputBase
                              placeholder="Search…"
                              classes={{
                                  root: classes.inputRoot,
                                  input: classes.inputInput,
                              }}
                              inputProps={{ 'aria-label': 'search' }}
                              value={inputText}
                              onChange={(e) => setInputText(e.target.value)}
                              placeholder="Search Artist or Song"
                              onKeyUp={handleKeyUp}
                            />
                          </>
                        }
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                      {loggedUser ? (
                          <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                          >
                            <AccountCircle />
                            <Typography style={{paddingLeft: '5px'}}>{loggedUser.displayName}</Typography>
                          </IconButton>
                        ) : (
                          <>
                            <Link to="/register" style={linkStyles}><Button color="inherit">Register</Button></Link>
                            <Link to="/login" style={linkStyles}><Button color="inherit">Login</Button></Link>
                          </>
                        )
                      }
                    </div>
                    <div className={classes.sectionMobile}>
                      <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                      >
                      <MoreIcon />
                      </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            { (!homePage || loggedUser) && <SideNav />}
            
        </div>
    )
}
