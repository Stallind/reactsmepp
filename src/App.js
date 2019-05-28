import React, { Component } from 'react';
import './App.css';
import './css/style.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Authenticated from './Authenticated';
import Login from "./Login";
import ProtectedPage from './ProtectedPage';
import Home from "./components/home";
import Navbar from "./components/navBar";
import Schedule from "./components/schedule";
import Course from "./components/course";
import Register from "./Register";
import {getJwt} from "./helpers/jwt";
import jwt_decode from "jwt-decode";
import Profile from "./components/profile";



class App extends Component {
  constructor(props) {
    super(props);
  console.log(props);
    this.state = {
      loggedIn: false,
      role: this.getRole()

    };
  }

  handleLogout = () => {
    localStorage.removeItem('HemligToken');
    this.setState({ loggedIn: false, role: false });
    console.log("Logged out");
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
    this.setState({ loggedIn: true, role: this.getRole() });
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
              <Route path="/home" component={Home} />
              <Route path="/protectedpage" component={ProtectedPage} />
              <Route path="/schedule" render={() => <Schedule title="Schedule" />} />
              <Route path="/course" render={() => <Course title="Courses" />} />
              <Route path="/register" component={Register} />
              <Route path="/profile" component={Profile} />
            </Authenticated>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;