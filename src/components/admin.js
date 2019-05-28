import React from 'react';
import { NavLink } from 'react-router-dom';
import image from '../img/Reg-logo.jpg';
import image1 from '../img/grades-logo.jpg';
import image2 from '../img/User-logo.jpg';


const Admin = props => (
    <nav className="admin-nav">
        <ul className="admin-ul">
            <div className="admin-main-div">
                <div className="admin-menu-div">
                    <img className="admin-logo" src={image} alt="reg-logo"></img>
                    <li><NavLink className="admin-menu-link" to="/adminCourse">Admin course</NavLink></li>
                </div>
                <div className="admin-menu-div">
                    <img className="admin-logo" src={image2} alt="user-logo"></img>
                    <li><NavLink className="admin-menu-link" to="/register">Admin register</NavLink></li>
                </div>
                <div className="admin-menu-div">
                    <img className="admin-logo" src={image1} alt="grates-logo"></img>
                    <li><NavLink className="admin-menu-link" to="/adminGrades">Admin grades</NavLink></li> 

                </div>
            </div>
        </ul>
    </nav>
);

export default Admin;
