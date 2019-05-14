import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            first_name:'',
            last_name:'',
            username:'',
            password:''
        }
    }
    handleClick(event){
        let apiBaseUrl = "https://localhost:44339/api/Register";
        console.log("values",this.state.first_name,this.state.last_name,this.state.username,this.state.password);
        //To be done:check for empty values before hitting submit
        let self = this;
        let payload={
            "first_name": this.state.first_name,
            "last_name":this.state.last_name,
            "username":this.state.username,
            "password":this.state.password
        };
        axios.post(apiBaseUrl+'/register', payload)
            .then(function (response) {
                console.log(response);
                if(response.data.code === 200){
                    //  console.log("registration successfull");
                    let loginscreen=[];
                    loginscreen.push(<Login parentContext={this}/>);
                    let loginmessage = "Not registered yet. Go to registration";
                    self.props.parentContext.setState({loginscreen:loginscreen,
                        loginmessage:loginmessage,
                        buttonLabel:"Register",
                        isLogin:true
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <h2>Register new user</h2>
                        <TextField
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            onChange = {(event,newValue) => this.setState({first_name:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            onChange = {(event,newValue) => this.setState({last_name:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            type = "password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default Register;

