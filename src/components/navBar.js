import React from "react";
import { NavLink } from 'react-router-dom';
import image from '../img/BirdBlue.png';

const Navbar = props => (
    <nav className="nav">
        <img className="navbar-logo" src={image} alt="blue bird"></img>

        <ul className="nav-menu">
            <li><NavLink className="nav-menu-link" activeClassName="activate" to="/home">home</NavLink></li>


            {props.role === "Teacher" || props.role === "Student" ?
                <>
                    <li><NavLink className="nav-menu-link" activeClassName="activate" to="/course">courses</NavLink></li>
                    <li><NavLink className="nav-menu-link" activeClassName="activate" to="/grades">my grades</NavLink></li>
                    <li><NavLink className="nav-menu-link" activeClassName="activate" to="/profile">profile</NavLink></li>
                </>
            : undefined}


            {props.role === "Admin" || props.role === "Teacher" ?
                <li><NavLink className="nav-menu-link" activeClassName="activate" to="/admin">admin</NavLink></li>
                : undefined}

            <li><NavLink className="nav-menu-link" activeClassName="activate" to="/login" onClick={props.logout()}>log out</NavLink></li>


        </ul>
    </nav>

);

export default Navbar;