import './App.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import HomePage from './components/homepage';
import ProfilePage from './components/profilepage/profilepage';
import ReportPage from './components/reportPage';

class App extends Component {

  state = {
    user: {},
    contestsGiven: {},
    contestId: ""
  }

  updateUserInfo = (userObject) => {
    this.setState({user: userObject});
  }

  updateContestsGivenInfo = (contestsGivenObject) => {
    this.setState({contestsGiven: contestsGivenObject});
  }

  updateContestId = (Id) => {
    this.setState({contestId: Id});
  }

  render(){
    return (
      <Router>
        <Route path="/" exact render={(props) => ( <HomePage {...props} updateUser={this.updateUserInfo} updateContests={this.updateContestsGivenInfo} />)} />
        <Route path="/profile" render={(props) => ( <ProfilePage {...props} user = {this.state.user} contests = {this.state.contestsGiven} Id = {this.updateContestId} />)} />
        <Route path="/report" render={(props) => ( <ReportPage {...props} id={this.state.contestId} />)} />
      </Router>
    );
  }
}

export default App;
