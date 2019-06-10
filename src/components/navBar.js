import React from "react";
import { NavLink } from 'react-router-dom';
import image from '../img/BirdBlue.png';

const Navbar = props => (
    <nav className="nav">
        <img className="navbar-logo" src={image} alt="blue bird"></img>

        <ul className="nav-menu">
            <li><NavLink className="nav-menu-link" activeClassName="activate" to="/home">Home</NavLink></li>

            {props.role === "Teacher" || props.role === "Student" ?
                <>

                    <li><NavLink className="nav-menu-link" activeClassName="activate" to="/course">Courses</NavLink></li>

                    <li><NavLink className="nav-menu-link" activeClassName="activate" to="/course">Courses</NavLink></li>

                    <li><NavLink className="nav-menu-link" activeClassName="activate" to="/profile">Profile</NavLink></li>
                </>
            : undefined}


            {props.role === "Admin" ?
                <li><NavLink className="nav-menu-link" activeClassName="activate" to="/admin">Admin</NavLink></li>
                : undefined}

            {props.role === "Teacher" ?
                <li><NavLink className="nav-menu-link" activeClassName="activate" to="/adminGrades">Manage grades</NavLink></li>
                : undefined}

            <li><NavLink className="nav-menu-link" activeClassName="activate" to="/login" onClick={props.logout()}>Log out</NavLink></li>
        </ul>
    </nav>

);

export default Navbar;