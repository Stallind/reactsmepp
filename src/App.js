import React, {Component} from 'react';
import './App.css';
import './css/style.css';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Authenticated from './components/Authenticated';
import Login from "./components/Login";
import Home from "./components/home";
import Navbar from "./components/navBar";
import Course from "./components/course";
import AdminCourse from "./components/adminCourse";
import AdminGrades from "./components/adminGrades";
import Admin from "./components/admin";
import Register from "./components/Register";
import {getJwt} from "./helpers/jwt";
import jwt_decode from "jwt-decode";
import Profile from "./components/profile";
import Grades from './components/grades';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      role: this.getRole(),
    };
  }

  getUser = () => {
    const jwt = getJwt();
    if(jwt !== null) {
      let user = jwt_decode(jwt);
      return user;
    }
    return undefined;
  };

  handleLogout = () => {
    localStorage.removeItem('HemligToken');
    this.setState({ loggedIn: false, role: false });
    alert("Successfully logged out");
  };

  getRole = () => {
    const jwt = getJwt();
    if(jwt !== null) {
      let decoded = jwt_decode(jwt);
      return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    }
      return undefined;
  };

  loginSucceeded = (token) => {
    localStorage.setItem('HemligToken', token);
    this.setState({ loggedIn: true, role: this.getRole()});
  };

  loginFailed = (message) => {
    console.log(message);
  };

  


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/login" component={() => <Login succeeded={this.loginSucceeded} failed={this.loginFailed} loggedIn={this.state.loggedIn}/>  } />
            <Authenticated>
              <Navbar role={this.state.role} loggedIn={this.state.loggedIn} logout={() => this.handleLogout}/>
              <Route exact path="/" render={() => <Redirect to="/home"/> } />
              <Route path="/home" component={() => <Home user={this.getUser()}  /> } />
              <Route path="/course" render={() => <Course title="Courses" />} />
              <Route path="/adminCourse" component={AdminCourse}/>
              <Route path="/admin" component={() => <Admin role={this.state.role}/>}/>
              <Route path="/register" component={Register} />
              <Route path="/profile" component={() => <Profile user={this.getUser()}  /> } />
              <Route path="/grades" component={Grades} />
              <Route path="/adminGrades" component={AdminGrades} />
            </Authenticated>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;