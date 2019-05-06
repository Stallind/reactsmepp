import React from 'react';
import { StudentList } from "../data/student";
import { Link } from 'react-router-dom';

const Profile = (props) => {

    let students = StudentList.map((person) => {
        return (
            <div className="student-container">
                <h3><Link className="name-container" to={`/students/${person.url}`}>{person.name}</Link></h3>
            </div>
        );
    });

    return (
        <div className="main-content">
            {/* <div><Link className="back" to="/students">BACK</Link></div> */}
            <div className="container">
                <h2>{props.title}</h2>
                <img className="profile-img" src={'http://chittagongit.com/images/person-icon/person-icon-5.jpg'}></img>
                <h1>Per Persson</h1>
                <h3>19830503-3000</h3>
                <h3>Sommergatan 5</h3>
                <h3>256 56 Malmö</h3>
                {/* {students} */}
            </div>
        </div>
    );
};

export default Profile;