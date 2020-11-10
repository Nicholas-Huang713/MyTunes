import React from 'react';
import NavBar from '../NavBar/NavBar';
import Player from '../Player/Player';
import './Layout.scss';

function Layout({children}) {
    return (
        <>
            <header className="header">
                <NavBar />
            </header>
            <main className="content">{children}</main>
            <footer className="player">
                <Player />
            </footer>
        </>
    )
}

export default Layout;