import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {getJwt} from "./helpers/jwt";

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    handleClick(event){
        let apiBaseUrl = "https://localhost:44339/api/login";

        const { history } = this.props;

        let payload={
            "username":this.state.username,
            "password":this.state.password
        };

        axios.post(apiBaseUrl, payload)
            .then(function (response) {
                console.log(response);

                if(response.status === 200)
                {
                    localStorage.setItem('HemligToken', response.data.value);
                    console.log("Login successfull");
                    history.push('/protectedpage');
                }
                else if(response.status === 204){
                    console.log("Username password do not match");
                    alert("Wrong username/password")
                }
                else{
                    console.log("Username does not exists");
                    alert("Wrong username/password");
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    render() {
        const jwt = getJwt();

        if (jwt) {
            this.props.history.push('/protectedpage');
        }

        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            hintText="Enter your username"
                            floatingLabelText="Username"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Login" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default Login;

