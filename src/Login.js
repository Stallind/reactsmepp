import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios/index';
import { getJwt } from "./helpers/jwt";
import './css/style.css';
import { black } from 'material-ui/styles/colors';
import { white } from 'material-ui/styles/colors';
import logo from "./img/BirdBlue.png";
import { blueA400 } from 'material-ui/styles/colors';

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
            password: ''
        }
    }

    handleClick(event) {
        let apiBaseUrl = "https://localhost:44339/api/login";

        const { history } = this.props;

        let payload = {
            "username": this.state.username,
            "password": this.state.password
        };

        axios.post(apiBaseUrl, payload)
            .then(function (response) {
                console.log(response);

                if (response.status === 200) {
                    localStorage.setItem('HemligToken', response.data.value);
                    console.log("Login successfull");
                    history.push('/home');
                }
                else if (response.status === 204) {
                    console.log("Username password do not match");
                    alert("Wrong username/password")
                }
                else {
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
            this.props.history.push('/home');
        }

        return (
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
        );
    }
}
const style = {
    margin: 15,

};
export default Login;

