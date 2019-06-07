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
            user: this.props.user,
            newUser: {},
            id: this.props.user.id,
            isLoading: true
        }
    }

    componentDidMount()  {
        axios.get(`${apiBaseUrl}${this.state.id}`,{ headers: { 'Authorization': `Bearer ${jwt}` } })
            .then(response => {
                    this.setState({newUser: response.data})
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
        const { isLoading, user, newUser} = this.state;
        return (
            <div className="profile-main">
                {!isLoading ? (
                    <div >
                        <h1>{user.name}'s profile</h1>
                        <p>Name: {newUser.firstName} {newUser.lastName}</p>
                        <p>Email: {newUser.email}</p>
                    </div>
                ) : ( <p>Loading..</p>
                )}
            </div>
        )};
}
export default Profile;

