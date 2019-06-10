import React, {Component} from 'react';
import jwt_decode from "jwt-decode";
import {getJwt} from "../helpers/jwt";

const jwt = getJwt();

class Home extends Component {
    constructor(props){
        super(props);
        this.state ={
            id: this.getId(),
            isLoading: true,
        }
    };

    getId = () =>{
        if(jwt !== null) {
            let decoded = jwt_decode(jwt);
        return decoded["id"]
        }
        return undefined;
    };

    render(){

        let user = this.props.user;
        var bacground = require('../img/happy.jpg');
    return (
        <div>
            <div>
              <h1 className="home-text">Welcome {user.name}</h1>
            </div>

           <div className="main-content">
            <div className="home-container">
                <br />
                <h2>News</h2>
                <div className="home-news">
                    <h3>New schedule for the year 2020</h3>
                    <p>Good morning all students.</p>
                    <p>This great year is almost over and now we have to start thinking about next year. For all of you that are graduating this year, congratulations we are so proud of all of you and whish you all the best in the future. But for thoes who are not we have finally published the schedule for next year.</p>
                    <p>...</p>
                </div>
                <br></br>
                <div className="home-news">
                    <h3>Visit from Apple</h3>
                    <p>Good day students!</p>
                    <p>Next monday we are having a really exciting visit from the founder of Apple (yes we all know he is dead). He will be telling us all about how it was for him to start as a developer and how we can get job at Apple after you have finished school!!</p>
                    <p>...</p>
                </div>
                <br></br>
                <div className="home-news">
                    <h3>Finally it´s time for a party.</h3>
                    <p>Good evening students.</p>
                    <p>Yes I said it, we are having a party tonight!! Hope everyone is up for a great night with me and the teachers and to get to know each other a little bit better.</p>
                    <p>...</p>
                </div>

                </div>
            </div> 
        </div>

    )
};
}
export default Home;