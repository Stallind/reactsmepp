import React, { Component } from 'react';
import './App.css';
import './css/style.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
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


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true,
      role: this.getRole()
    }
  }

  handleLogout = () => {
    this.setState({ loggedIn: false});
    localStorage.removeItem('HemligToken');
    //this.history.push('/login');
    console.log("Logged out");
    console.log(this.state.loggedIn);
  };

  getRole = () => {
    const jwt = getJwt();
    let decoded = jwt_decode(jwt);
    return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Authenticated>
            <Navbar role={this.state.role} logout={() => this.handleLogout}/>
              <Route path="/home" component={Home} />
              <Route path="/protectedpage" component={ProtectedPage} />
              <Route path="/schedule" render={() => <Schedule title="Schedule" />} />
              <Route path="/course" render={() => <Course title="Courses" />} />
              <Route path="/register" component={Register} />

            </Authenticated>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
