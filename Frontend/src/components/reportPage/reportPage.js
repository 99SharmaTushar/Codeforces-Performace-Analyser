import React, { Component } from 'react';
import './report.css';

class reportPage extends Component {

    state = {
        error: ""
    }
    
    render() {

        const { report,selectedContest } = this.props;

        return (
            <div id="paper">
            <div id="pattern">
                <div id="content">
                    contestId = {selectedContest.contestId}<br/>
                    contestName = {selectedContest.contestName}<br/>          
                    handle = {selectedContest.handle}<br/>
                    newRating = {selectedContest.newRating}<br/>
                    oldRating = {selectedContest.oldRating}<br/>
                    rank = {selectedContest.rank}<br/>
                    {report.averageRank}<br/>
                
                    {/* USE {this.props.user} to relate/show about max rating, etc etc..think later how you can utilise this user info */}
                    {/* USE {this.props.contests} to relate about other things such as previous recent contests performace, etc etc... no of contests.. etc..a trend, or something else.. think later */}
                    {/* USE {this.props.contests} to show the number of times in total rating increased and decreased.. and performace ratio,... percentage wise... ratio wise.. etc... */}
                    {/* Think if you could somehow build an algo in backend.. to show something related to time.. i.e if you would have solved it in this much or this much less time.. then your rank or rating would have been this much !! */}
                    {/* Display errors */}
                    {/* Insert a preparing report at the starting  */}
                </div>
            </div>
            </div>
        )
    }
}

export default reportPage;