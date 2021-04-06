import React, { Component } from 'react';
import { Form, Grid, Icon, Button, Message, Header } from 'semantic-ui-react';
const axios = require('axios');

class HomePage extends Component {

    state = {
        handle: "",
        error: ""
    }

    handleChange = event => {
        this.setState({handle: event.target.value});
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        if(this.state.handle.length){
            this.setState({error: ""});
            const urlForContestsGivenByUser = "http://localhost:5000/user/ratingChange/"+ this.state.handle;
            axios.get(urlForContestsGivenByUser)
                .then((response)=>{
                    if(response.status!==200){
                        this.setState({ error: "Sorry, we can't find contests info of \"" + this.state.handle + "\" !!" });
                    }else {
                        const obj = response.data;
                        obj.contests.reverse();
                        this.props.updateContests(obj);
                    }
                })
                .catch((err)=>{
                    this.setState({error: err});
                })

            const url = "http://localhost:5000/user/"+ this.state.handle ;
            axios.get(url)
                .then((response)=>{
                    if(response.data.status!=="OK"){
                        this.setState({ error: "Sorry, we can't find a user with \"" + this.state.handle + "\"as handle !!" });
                    }else {
                        this.props.updateUser(response.data.result);
                        //<Redirect to="/profile" />
                        this.props.history.push("/profile");
                    }
                })
                .catch((err)=>{
                    this.setState({error: err});
                })
        }else {
            this.setState({ error: "We can't analyse your performance without your Codeforces Handle" });
        }
    }

    render(){
        return(
            <Grid textAlign="center" verticalAlign="middle" className="homeGrid">
                <Grid.Column style={ {maxWidth: 457} }>
                    <Header as="h1" icon color="blue" textAlign="center">
                        <Icon name="code" color="blue" />
                        Codeforces Performance Analyser
                    </Header>
                    <Form onSubmit={this.handleSubmit} autoComplete="off" className="homeForm">
                         <Form.Input fluid name="username" icon="user" iconPosition="left" 
                          placeholder="Codeforces Handle" type="text" onChange={this.handleChange} value={this.state.handle} />
                         <Button color="blue" fluid size="large">Enter</Button>
                    </Form>  
                    {this.state.error.length>0 && (
                        <Message error>
                            <h3>Error</h3>            
                            {this.state.error}
                        </Message>
                    )}
                </Grid.Column>
            </Grid>
        );
    }
}

export default HomePage;