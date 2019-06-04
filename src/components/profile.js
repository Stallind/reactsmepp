import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import axios from "axios";
import { getJwt } from "../helpers/jwt";

let apiBaseUrl = "https://localhost:44339/api/applicationusers/";
const jwt = getJwt();

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            user: {},
            id: this.getId(),
            isLoading: true
        }
    }

    getId = () => {
        if(jwt !== null) {
            let decoded = jwt_decode(jwt);
            return decoded["id"]
        }
    };

    componentDidMount()  {
          axios.get(`${apiBaseUrl}${this.state.id}`,{ headers: { 'Authorization': `Bearer ${jwt}` } })
            .then(response => {
                    console.log(response);
                    this.setState({user: response.data})
                }
            )
            .then(response => {
                this.setState({
                    isLoading: false
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
        }

    render() {
        const { isLoading, user} = this.state;
        return (
            <div className="profile-main">
            {!isLoading ? (
                <div >
                <h1>{user.firstName}'s profile</h1>
                <p>Name: {user.firstName} {user.lastName}</p>
                <p>Email: {user.email}</p>
                </div>
            ) : ( <p>Loading..</p>
            )}
            </div>
        )};
    }

export default Profile;