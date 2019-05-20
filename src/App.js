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


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true,
    }
  }

  handleLogout = () => {
    this.setState({ loggedIn: false });
    localStorage.removeItem('HemligToken');
    //this.history.push('/login');
    console.log("Logged out");
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Authenticated>
              <Navbar logout={() => this.handleLogout} title="# smepp" />
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
