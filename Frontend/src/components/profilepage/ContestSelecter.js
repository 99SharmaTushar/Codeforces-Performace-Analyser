import React, { Component } from 'react';
import './contestSelecter.css';
import { Button, Message, Icon } from 'semantic-ui-react';

import FinderSelect from 'react-finderselect'
import 'react-finderselect/dist/index.css'


class contestSelecter extends Component {

    // state = {
    //     contests: [],
    //     show: false
    // }

    // componentWillReceiveProps() {
    //     this.setState({show: true});
    //     this.setState({contests: this.props.contests.contests});
    //     this.forceUpdate();
    // }

    state = {
        contestId: "",
        error: []
    }

    handleClick = () => {
        if(this.state.contestId===""){
            this.setState({error: "Sorry, we can't analyse your performance without you letting us know the contest name !!"})
        }else {
            this.setState({error: ""});
            var selectedContest = this.props.contests.contests.filter(obj => {
                return (obj.contestId+"") === this.state.contestId
            });
            this.props.updateContest(selectedContest[0]);
            this.props.history.push("/report");
        }
    }

    handleChange = (event) => {
        this.setState({contestId: event.value});
    }

    render() {
        return (
            <div key={this.props.contests.contests} className="container">
                <div className="headDiv">
                    <Message info={true}>
                    <Message.Header>Analyse Your Performace</Message.Header>
                    <Message.Content>(Note: You must have participated in the contest to be Evaluated)</Message.Content>
                    </Message>
                    {this.props.contests.contests && (<FinderSelect data={this.props.contests.contests} label="contestName" value="contestId"
                     placeholder="Select a contest"  onChange={this.handleChange} />)}
                    {/* {this.state.show && (<FinderSelect data={this.props.contests.contests} label="contestName" value="contestId"/>)} */}
                    <Button onClick={this.handleClick} fluid size="large" style={{marginTop: "15px"}} ><Icon name="search" /> Analyse</Button>
                    {this.state.error.length>0 && (
                        <Message error>
                            <h3>Error</h3>            
                            {this.state.error}
                        </Message>
                    )}
                </div>
            </div>
        );
    }
}

export default contestSelecter;