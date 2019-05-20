import React, { Component } from 'react';
import axios from 'axios';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
import { getJwt } from "./helpers/jwt";
//import Login from './Login';

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
            role: ''
        }
    }


    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHendler = (e) => {
        e.preventDefault();
        console.log(this.state);
        console.log(jwt);
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
        axios.post('https://localhost:44339/api/Register', { headers: { headers } }, this.state)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        const { firstName, lastName, socialSecurityNumber, email, password, role } = this.state;
        return (
            <div>
                <form onSubmit={this.submitHendler}>
                    <div>
                        <label>First name</label>
                        <input type="text" name="firstName" value={firstName} onChange={this.changeHandler}></input>
                    </div>
                    <div>
                        <label>Last name</label>
                        <input type="text" name="lastName" value={lastName} onChange={this.changeHandler}></input>
                    </div>
                    <div>
                        <label>Social security number</label>
                        <input type="text" name="socialSecurityNumber" value={socialSecurityNumber} onChange={this.changeHandler}></input>
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text" name="email" value={email} onChange={this.changeHandler}></input>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="text" name="password" value={password} onChange={this.changeHandler}></input>
                    </div>
                    <div>
                        <label>Role</label>
                        <input type="text" name="role" value={role} onChange={this.changeHandler}></input>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Register;

// class Register extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             first_name: '',
//             last_name: '',
//             social_security_number: '',
//             email: '',
//             password: '',
//             role: '',
//             user_name: ''
//         }
//     }

//     handleClick(event) {
//         let apiBaseUrl = "https://localhost:44339/api/";

//         const { history } = this.props;

//         console.log("values", this.state.first_name, this.state.last_name, this.state.social_security_number, this.state.email, this.state.password, this.state.role, this.state.user_name);
//         //To be done:check for empty values before hitting submit
//         // let self = this;
//         let payload = {
//             "first_name": this.state.first_name,
//             "last_name": this.state.last_name,
//             "social_secuity_nember": this.state.social_security_number,
//             "email": this.state.email,
//             "password": this.state.password,
//             "role": this.state.role,
//             "user_name": this.state.user_name
//         };


//         axios.post(apiBaseUrl + '/Register', payload)
//             .then(function (response) {
//                 console.log(response);
//                 if (response.data.code === 201) {
//                     //Save user in student or teacher
//                     console.log("New user created");
//                 } else {
//                     //Not saved
//                     console.log("somthing whent wrong")
//                 }
//                 // if (response.data.code === 200) {
//                 //     //  console.log("registration successfull");
//                 //     let loginscreen = [];
//                 //     loginscreen.push(<Login parentContext={this} />);
//                 //     let loginmessage = "Not registered yet. Go to registration";
//                 //     self.props.parentContext.setState({
//                 //         loginscreen: loginscreen,
//                 //         loginmessage: loginmessage,
//                 //         buttonLabel: "Register",
//                 //         isLogin: true
//                 //     });
//                 // }
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }

//     render() {
//         // const jwt = getJwt();

//         // if (jwr) {

//         //     //Get post 
//         // }

//         return (
//             <div className="reg-container">
//                 <MuiThemeProvider>
//                     <div className="reg-div">
//                         <div className="reg-main">
//                             <h2 className="reg-new">Register new user</h2>
//                             <TextField
//                                 hintText="Enter first name"
//                                 floatingLabelText="First Name"
//                                 onChange={(event, newValue) => this.setState({ first_name: newValue })}
//                             />
//                             <br />
//                             <TextField
//                                 hintText="Enter last name"
//                                 floatingLabelText="Last Name"
//                                 onChange={(event, newValue) => this.setState({ last_name: newValue })}
//                             />
//                             <br />
//                             <TextField
//                                 hintText="Enter social security number"
//                                 floatingLabelText="Social security number"
//                                 onChange={(event, newValue) => this.setState({ social_security_number: newValue })}
//                             />
//                             <br />
//                             <TextField
//                                 hintText="Enter your email"
//                                 type="email"
//                                 floatingLabelText="Email"
//                                 onChange={(event, newValue) => this.setState({ username: newValue })}
//                             />
//                             <br />
//                             <TextField
//                                 type="password"
//                                 hintText="Enter your Password"
//                                 floatingLabelText="Password"
//                                 onChange={(event, newValue) => this.setState({ password: newValue })}
//                             />
//                             <br />
//                             <TextField
//                                 hintText="Enter role"
//                                 floatingLabelText="Role"
//                                 onChange={(event, newValue) => this.setState({ role: newValue })}
//                             />
//                             <br />
//                             <TextField
//                                 hintText="Enter username"
//                                 floatingLabelText="Username"
//                                 onChange={(event, newValue) => this.setState({ user_name: newValue })}
//                             />
//                             <br />
//                             {/* <br />
//                             <div className="reg-checkbox">
//                                 <p><input type="radio" name="type" value="student" />Student</p>
//                                 <p><input type="radio" name="type" value="teacher" />Teacher</p>
//                             </div>
//                             <br /> */}
//                             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
//                         </div>

//                         <div className="reg-student">
//                             <h1>Studets</h1>
//                             <div className="reg-name-container">
//                                 <h5>Name </h5>
//                                 <h5>Email</h5>
//                             </div>
//                         </div>
//                         <div className="reg-teacher">
//                             <h1>Teachers</h1>
//                             <div className="reg-name-container">
//                                 <h5>Name </h5>
//                                 <h5>Email</h5>
//                             </div>
//                         </div>
//                     </div>

//                 </MuiThemeProvider>
//             </div>
//         );
//     }
// }
// const style = {
//     margin: 15,
// };
//export default Register;

