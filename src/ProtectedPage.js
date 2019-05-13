import React from 'react';
import axios from "axios";
import { getJwt } from "./helpers/jwt";

const jwt = getJwt();

let apiBaseUrl = "https://localhost:44339/api/teacher";

class ProtectedPage extends React.Component {
    state = {
        courses: [],
        isLoading: true,
        errors: null
    };

    componentDidMount()  {
        axios.get(apiBaseUrl, { headers: {"Authorization" : `Bearer ${jwt}`}})
            .then(response => {
                console.log(response);
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
                <h1>
                    Your courses are {}
                </h1>
                <div>
                    {!isLoading ? (
                        courses.map(course => {
                            const { name, points} = course;
                            return (
                                <div key={name+1}> <p>{name} {points}</p> </div>
                            );
                        })
                    ) : ( <p>Loading..</p>
                    )}
                </div>
            </React.Fragment>
        );
    }
}


export default ProtectedPage;
