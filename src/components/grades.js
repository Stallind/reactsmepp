import React from 'react';
import axios from 'axios';
import { getJwt } from "../helpers/jwt";
import jwt_decode from "jwt-decode";

const jwt = getJwt();
let apiBaseUrl = "https://localhost:44339/api/grades/";


class Grades extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.getId(),
            grades: [],
            isLoading: true,
            errors: null
        }
    }
    getId = () => {
        if(jwt !== null) {
            let decoded = jwt_decode(jwt);
            return decoded["id"]
        }
    };

    componentDidMount()  {
       
          axios.get(`${apiBaseUrl}${this.state.id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
            .then(response => {
                    console.log(response);
                    return response.data.map(grade => ({
                        name: `${grade.courseName}`,
                        result: `${grade.result}`
                    }))
                }
            )
            .then(grades => {
                this.setState({
                    grades,
                    isLoading: false
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        const { isLoading, grades} = this.state;
        return (
            <div className="grates-student-main">
            <h1>My Grades</h1>
            {!isLoading ? (
                grades.map(grade => {
                            const { name, result} = grade;
                            return (
                                <div className="grade-name" key={name+1}> <p>{name} -- {result}</p> </div>
                            );
                        })
            ) : ( <p>Loading..</p>
            )}
            </div>
        )};
}
export default Grades;