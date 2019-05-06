import React, { Component } from 'react';
import {getJwt} from "./helpers/jwt";
import { withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

class AuthenticatedComponent extends Component {
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
            this.setState({ user: decoded.name});
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
        );
    }
}

export default withRouter(AuthenticatedComponent);