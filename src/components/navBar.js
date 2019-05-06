import React from "react";
import { NavLink } from 'react-router-dom';
import image from '../img/BirdBlue.png';

const Navbar = props => (
    <nav>
        <img className="navbar-logo" src={image}></img>
        {/* <h2 className="logo"><a className="logo-link" href="#">{props.title}</a></h2> */}

        <ul className="nav-menu">
            <li><NavLink className="nav-menu-link" exact to="/">Home</NavLink></li>
            <li><NavLink className="nav-menu-link" activeClassName="activate" to="/course">Schedule</NavLink></li>
            <li><NavLink className="nav-menu-link" activeClassName="activate" to="/teachers">Courses</NavLink></li>
            <li><NavLink className="nav-menu-link" activeClassName="activate" to="/students">Profile</NavLink></li>
        </ul>
    </nav>


);

export default Navbar;