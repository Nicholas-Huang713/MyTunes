import React, {useContext} from 'react';
import NavBar from '../NavBar/NavBar';
import Player from '../Player/Player';
import {UserContext} from '../../providers/UserProvider';
import './Layout.scss';

function Layout({children}) {
    const loggedUser = useContext(UserContext);

    return (
        <>
            <header className="header">
                <NavBar />
            </header>
            <main className={loggedUser? "content-padding" : "content"}>{children}</main>
            <footer className="player">
                <Player />
            </footer>
        </>
    )
}

export default Layout;