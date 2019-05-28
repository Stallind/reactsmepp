import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { getJwt } from "./helpers/jwt";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { white } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    raisedButton: {
        color: 'rgb(23, 54, 75)',
        textColor: white
    },
    textField: {
        textColor: 'rgb(23, 54, 75)'
    }
});

const jwt = getJwt();


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            socialSecurityNumber: '',
            email: '',
            password: '',
            role: '',
            username: '',
            students: [],
            teachers: [],
            isLoading: true,
            errors: null
        }
    }

    componentDidMount() {
        axios.get('https://localhost:44339/api/applicationUsers/role/student/', this.state, { headers: { 'Authorization': `Bearer ${jwt}` } })
        .then(response => {
            console.log(response.data);
            return response.data.map(student => ({
                firstName: `${student.firstName}`,
                lastName: `${student.lastName}`,
                email: `${student.email}`
            }))
        })
        .then(students => {
            this.setState({
                students,
                isLoading: false
            });
        })
        .catch(error => this.setState({ error, isLoading: false}));

        axios.get('https://localhost:44339/api/applicationUsers/role/teacher/', this.state, { headers: { 'Authorization': `Bearer ${jwt}` } })
            .then(response => {
                console.log(response.data);
                return response.data.map(teacher => ({
                    firstName: `${teacher.firstName}`,
                    lastName: `${teacher.lastName}`,
                    email: `${teacher.email}`
                }))
            })
            .then(teachers => {
                this.setState({
                    teachers,
                    isLoading: false
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitHendler = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.post('https://localhost:44339/api/register', this.state, { headers: { 'Authorization': `Bearer ${jwt}` } })
            .then(response => {
                console.log(response);
                alert('User has been registered');
                
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const { firstName, lastName, socialSecurityNumber, email, password, role, username, isLoading, students, teachers } = this.state;
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div className="reg-div">
                        <div className="reg-main">
                            <form className="reg-form" onSubmit={this.submitHendler}>
                                <h3 className="reg-new">Register new user</h3>
                                <div>
                                    <TextField hintText="Enter first name" floatingLabelText="First name" floatingLabelFixed={true} type="text" name="firstName" value={firstName} onChange={this.changeHandler}></TextField>
                                </div>
                                <div>
                                    <TextField
                                        hintText="Enter last name" floatingLabelText="Last name" floatingLabelFixed={true} type="text"
                                        name="lastName" value={lastName} onChange={this.changeHandler}
                                    />
                                </div>
                                <div>
                                    <TextField hintText="Enter social security number" floatingLabelText="Social security number" floatingLabelFixed={true} type="text" name="socialSecurityNumber" value={socialSecurityNumber} onChange={this.changeHandler}></TextField>
                                </div>
                                <div>
                                    <TextField hintText="Enter email" floatingLabelText="Email" floatingLabelFixed={true} name="email" type="text" value={email} onChange={this.changeHandler}></TextField>
                                </div>
                                <div>
                                    <TextField hintText="Enter password" floatingLabelText="Password" floatingLabelFixed={true} type="password" name="password" value={password} onChange={this.changeHandler}></TextField>
                                </div>
                                <div>
                                    <TextField hintText="Enter role" floatingLabelText="Role" floatingLabelFixed={true} type="text" name="role" value={role} onChange={this.changeHandler}></TextField>
                                </div>
                                <div>
                                    <TextField hintText="Enter username" floatingLabelText="Username" floatingLabelFixed={true} type="text" name="username" value={username}onChange={this.changeHandler}></TextField>
                                </div>
                                <br />
                                <RaisedButton label="Submit" type="submit"></RaisedButton>
                            </form>
                        </div>
                        <div className="reg-div-two">
                            <h1 className="reg-student">Students</h1>
                            <div className="reg-name-container">
                                <h5>Name </h5>
                                <h5>Email</h5>
                            </div>
                            <div>
                                {!isLoading ? (
                                    students.map(student => {
                                        const {firstName, lastName, email} = student;
                                        return(
                                            <div className="reg-student-get-main" key={firstName + 1}>
                                                <p className="reg-student-get">{firstName} {lastName}</p>
                                                <p className="reg-student-get2"> {email}</p>  
                                            </div>
                                        );
                                    })
                                ): (<p>Loading...</p>)}
                            </div>
                        </div>
                        <div className="reg-div-two">
                            <h1 className="reg-student">Teachers</h1>
                            <div className="reg-name-container">
                                <h5>Name </h5>
                                <h5>Email</h5>
                            </div>
                            <div>
                                {!isLoading ? (
                                    teachers.map(teacher => {
                                        const { firstName, lastName, email } = teacher;
                                        return (
                                            <div key={firstName + 1}>
                                                <p className="reg-student-get">{firstName} {lastName}</p>
                                                <p className="reg-student-get"> {email}</p>
                                            </div>
                                        );
                                    })
                                ) : (<p>Loading...</p>)}
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default Register;


