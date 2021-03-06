import React from 'react'
//UI
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import './SideNav.scss';

//router
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function SideNav() {
    const classes = useStyles();
    const history = useHistory();

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}

      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem key="dashboard" button onClick={() => history.push('/dashboard')}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem key="favorites" button onClick={() => history.push('/mylibrary')}>
              <ListItemIcon><LibraryMusicIcon /></ListItemIcon>
                <ListItemText primary="Your Library" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    )
}
