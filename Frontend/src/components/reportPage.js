import React, { Component } from 'react';

class reportPage extends Component {
    render() {
        return (
            <div>
                contestId = {this.props.selectedContest.contestId}
                contestName = {this.props.selectedContest.contestName}
                handle = {this.props.selectedContest.handle}
                newRating = {this.props.selectedContest.newRating}
                oldRating = {this.props.selectedContest.oldRating}
                rank = {this.props.selectedContest.rank}
            </div>
        )
    }
}

export default reportPage;