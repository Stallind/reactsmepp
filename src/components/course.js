import React from 'react';
import axios from "axios";
import { getJwt } from "../helpers/jwt";
import jwt_decode from "jwt-decode";

let apiBaseUrlAdmin = "https://localhost:44339/api/courses";
let apiBaseUrl = "https://localhost:44339/api/courses/user/";
let currentApi= apiBaseUrlAdmin;

class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            isLoading: true,
            errors: null,
            role: this.getRole(),
            id: this.getId()
        };
    }
    getRole = () => {
        const jwt = getJwt();
        let decoded = jwt_decode(jwt);
        return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    };

    getId = () => {
        const jwt = getJwt();
        let decoded = jwt_decode(jwt);
        return decoded["id"]
    };

    componentDidMount()  {
        console.log(this.state.role);

        if(this.state.role !== "Admin"){
            currentApi = `${apiBaseUrl}${this.state.id}`;
        }

        axios.get(`${currentApi}`)
            .then(response => {
                    console.log(response);
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