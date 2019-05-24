import React, { Component } from 'react';
import { getJwt } from "./helpers/jwt";
import { withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

class Authenticated extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined
        };
    }

    componentDidMount() {

        const jwt = getJwt();

        if (jwt) {
            let decoded = jwt_decode(jwt);
            this.setState({ user: decoded.name });
            console.log(decoded.name);
            this.props.history.push('/home');
        }
        else {
            this.props.history.push('/login');
        }
    }

    render() {
        if (this.state.user === undefined) {
            return (
                <div><h1>Loading...</h1></div>
            );
        }

        return (
            <div>
                {this.props.children}
            </div>
            //<h1>hello {this.state.user}</h1>
        );
    }
}

export default withRouter(Authenticated);