import React from 'react';
import { TeachersList } from "../data/teacher"
import { Link } from 'react-router-dom';

const Course = (props) => {

    let teachers = TeachersList.map((person) => {
        return (
            <div className="teacher-container">
                <h3><Link className="name-container" to="/">{person.name}</Link></h3>
            </div>
        );
    });

    return (
        <div className="main-content">
            <div className="container">
                <h2 className="course-name">{props.title}</h2>
                {teachers}
            </div>
        </div>
    );
};

export default Course;