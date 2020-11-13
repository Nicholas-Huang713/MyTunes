import React from 'react';
import './App.scss';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import MyLibrary from './components/MyLibrary/MyLibrary';
import SearchData from './components/SearchData/SearchData';
import UserProvider from "./providers/UserProvider";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/mylibrary" component={MyLibrary} />
              <Route exact path="/search" component={SearchData} />
            </Switch>
          </Layout>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
