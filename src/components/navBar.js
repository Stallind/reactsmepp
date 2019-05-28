import React from "react";
import { NavLink } from 'react-router-dom';
import image from '../img/BirdBlue.png';

const Navbar = props => (
    <nav className="nav">
        <img className="navbar-logo" src={image} alt="blue bird"></img>
        {/* <h2 className="logo"><a className="logo-link" href="#">{props.title}</a></h2> */}

        <ul className="nav-menu">
            <li><NavLink className="nav-menu-link" activeClassName="activate" to="/home">home</NavLink></li>
            
            <li><NavLink className="nav-menu-link" activeClassName="activate" to="/course">courses</NavLink></li>
            {/* <li><NavLink className="nav-menu-link" activeClassName="activate" to="/teachers">Schedule</NavLink></li> */}

            <li><NavLink className="nav-menu-link" activeClassName="activate" to="/grades">My Grades</NavLink></li>
            <li><NavLink className="nav-menu-link" activeClassName="activate" to="/profile">profile</NavLink></li>
            

            {props.role === "Admin"
                ?
                <li><NavLink className="nav-menu-link" activeClassName="activate" to="/admin">admin</NavLink></li>
                // <li><NavLink className="nav-menu-link" activeClassName="activate" to="/register">admin</NavLink><NavLink className="nav-menu-link" activeClassName="activate" to="/adminCourse">admin courses</NavLink></li> 
                : undefined}

            <li><NavLink className="nav-menu-link" activeClassName="activate" to="/login" onClick={props.logout()}>log out</NavLink></li>


        </ul>
    </nav>

);

export default Navbar;