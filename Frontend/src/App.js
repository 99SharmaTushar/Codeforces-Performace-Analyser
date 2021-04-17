import './App.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import HomePage from './components/homepage';
import ProfilePage from './components/profilepage/profilepage';
import ReportPage from './components/reportPage/reportPage';

class App extends Component {

  state = {
    user: {},
    contestsGiven: {},
    selectedContest: {},
    ratingChangeObject: {}
  }

  updateUserInfo = (userObject) => {
    this.setState({user: userObject});
  }

  updateContestsGivenInfo = (contestsGivenObject) => {
    this.setState({contestsGiven: contestsGivenObject});
  }

  updateContest = (contest) => {
    this.setState({selectedContest: contest});
  }

  updateRatingChange = (obj) => {
    this.setState({ratingChangeObject: obj});
  }

  render(){
    return (
      <Router>
        <Route path="/" exact render={(props) => ( <HomePage {...props} updateUser={this.updateUserInfo} updateContests={this.updateContestsGivenInfo} />)} />
        <Route path="/profile" render={(props) => ( <ProfilePage {...props} user = {this.state.user} contests = {this.state.contestsGiven} updateContest = {this.updateContest} updateRatingChange = {this.updateRatingChange} />)} />
        <Route path="/report" render={(props) => ( <ReportPage {...props} user = {this.state.user} contests = {this.state.contestsGiven} selectedContest = {this.state.selectedContest} report = {this.state.ratingChangeObject} />)} />
      </Router>
    );
  }
}

export default App;
