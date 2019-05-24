import React, { Component } from 'react';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''

        }
    }


    render() {
        return (
            <div className="main-content">
                <div className="container">
                    <h2>{props.username}</h2>
                    <h1>Per Persson</h1>
                    <h3>19830503-3000</h3>
                    <h3>Sommergatan 5</h3>
                    <h3>256 56 Malmö</h3>
                </div>
            </div>
        )
    };
}

export default Profile;