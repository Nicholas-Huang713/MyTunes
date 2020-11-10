import React from 'react';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Song from './components/Song/Song';
import Player from './components/Player/Player';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


function App() {

  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />

          </Switch>
        </Layout>
      </Router>
    </>
  );
}

export default App;
