import React from 'react';
import './App.scss';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import MyLibrary from './components/MyLibrary/MyLibrary';
import UserFaves from './components/UserFaves/UserFaves';
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
              <Route exact path="/login" component={Register} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/mylibrary" component={MyLibrary} />
              <Route exact path="/search" component={SearchData} />
              <Route exact path="/userfaves" component={UserFaves} />
              {/* <Route path='/userfaves' render={(props) => <PlaylistDetails {...props} chooseSong={this.chooseSong}/>} /> */}

            </Switch>
          </Layout>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
