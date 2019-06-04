import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios/index';
import './css/style.css';
import { black } from 'material-ui/styles/colors';
import { white } from 'material-ui/styles/colors';
import logo from "./img/BirdBlue.png";
import { blueA400 } from 'material-ui/styles/colors';
import {Redirect} from "react-router-dom";



const muiTheme = getMuiTheme({
    palette: {
        textColor: black,
    },
    appBar: {
        height: 100,
        textColor: white,
        color: white,
        boxShadow: '2px 2px 2px 2px',
    },
    textField: {
        textColor: black,
        color: black
    },
    raisedButton: {
        color: blueA400,
        textColor: white
    },
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false
        };
        this.handleClick = this.handleClick.bind(this);
    };



    handleClick(event) {
        let apiBaseUrl = "https://localhost:44339/api/login";

        let payload = {
            "username": this.state.username,
            "password": 'P@ssword1'
            //"password": this.state.password
        };
        if (this.state.username === 'a')
        {
            payload.username = "janedoe@nomail.com"
        }else if (this.state.username === 's')
        {
            payload.username = "jimdoe@nomail.com"
        }else if (this.state.username === 't'){
            payload.username = "johndoe@nomail.com"
        }

        let succeeded = this.props.succeeded;
        let failed  = this.props.failed;


        axios.post(apiBaseUrl, payload)
            .then( (response) => {
                let token = response.data.value;

                if (response.status === 200) {
                    succeeded(token);
                }
                else if (response.status === 204) {
                    failed("Username/password is incorrect");
                }
                else {
                    failed("Can't connect to login-server");
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    render() {
        return (
            <>
                {this.props.loggedIn ? <Redirect to="/home" /> : null}
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <AppBar
                            title={<img src={logo} className="logo-img" alt="logo blue bird" />}
                        />
                        <br />
                        <TextField
                            hintText="Enter your username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({ username: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <RaisedButton label="Login" primary={false} style={style} onClick={(event) => this.handleClick(event)} />
                    </div>
                </MuiThemeProvider>
            </div>
               </>
        );
    }
}
const style = {
    margin: 15,
};
export default Login;

