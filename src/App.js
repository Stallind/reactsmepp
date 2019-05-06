import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Authenticated from './Authenticated';
import Login from "./Login";
import ProtectedPage from './ProtectedPage';
import Home from "./Home";


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
             <Authenticated>
                <Route path="/protectedpage" component={ProtectedPage} />
             </Authenticated>
          </Switch>
        </BrowserRouter>
    );
  }
}
export default App;
