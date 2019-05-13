import React from 'react';
import axios from "axios";

let apiBaseUrl = "https://localhost:44339/api/courses";

class Course extends React.Component {
    state = {
        courses: [],
        isLoading: true,
        errors: null
    };

    componentDidMount()  {
        axios.get(apiBaseUrl)
            .then(response => {
                    console.log(response.data);
                    return response.data.map(course => ({
                        name: `${course.name}`,
                        points: `${course.points}`
                    }))
                }
            )
            .then(courses => {
                this.setState({
                    courses,
                    isLoading: false
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        const { isLoading, courses} = this.state;
        return (
            <React.Fragment>

                <div className="main-content">
                    <div className="container">
                        <h2 className="course-name">Your courses are: </h2>
                    </div>
                </div>

                <div>
                    {!isLoading ? (
                        courses.map(course => {
                            const { name, points} = course;
                            return (
                                <div className="course-name" key={name+1}> <p>{name} {points}</p> </div>
                            );
                        })
                    ) : ( <p>Loading..</p>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default Course;

// Erlas kod från början på course.js
//
// import React from 'react';
// import { TeachersList } from "../data/teacher"
// import { Link } from 'react-router-dom';
//
// const Course = (props) => {
//
//     let teachers = TeachersList.map((person) => {
//         return (
//             <div className="teacher-container">
//                 <h3><Link className="name-container" to="/">{person.name}</Link></h3>
//             </div>
//         );
//     });
//
//     return (
//         <div className="main-content">
//             <div className="container">
//                 <h2 className="course-name">{props.title}</h2>
//                 {teachers}
//             </div>
//         </div>
//     );
// };
//
// export default Course;