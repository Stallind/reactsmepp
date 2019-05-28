import React from 'react';
import axios from "axios";
import { getJwt } from "../helpers/jwt";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { white } from 'material-ui/styles/colors';
import jwt_decode from 'jwt-decode';

const muiTheme = getMuiTheme({
    raisedButton: {
        color: 'rgb(40, 134, 158)',
        textColor: white
    },
    textField: {
        textColor: 'rbg(23, 54, 75)'
    }
});

let apiBaseUrl = "https://localhost:44339/api/courses";
let apiBaseUrlAdmin = "https://localhost:44339/api/courses/user/";
let currentApi = apiBaseUrl;
const jwt = getJwt();

class adminCourse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            points: '',
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

    componentDidMount() {
        console.log(this.state.role);

        if (this.state.role !== "Admin") {
            currentApi = `${apiBaseUrlAdmin}${this.state.id}`;
        }

        // axios.get(apiBaseUrl, this.state, {headers: {'Authorization': `Bearer ${jwt}`}})
        axios.get(`${currentApi}`)
            .then(response => {
                console.log(response.data);
                return response.data.map(course => ({
                    name: `${course.name}`,
                    points: `${course.points}`
                }))
            })
            .then(courses => {
                this.setState({
                    courses,
                    isLoading: false
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHendler = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.post(apiBaseUrl, this.state, {
            headers: { 'Authorization': `Bearer ${jwt}` }
        }).then(response => {
            console.log(response);
            alert('Course has been registered');
        })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { isLoading, courses, name, points } = this.state;
        return (
            <div>
                {/* // <React.Fragment> */}
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div className="admin-course-div">
                        <div className="admin-course-main">
                            <form onSubmit={this.submitHendler}>
                                <h3 className="admin-course-new">Register new course</h3>
                                <div>
                                    <TextField hintText="Enter name of the course" floatingLabelText="Course name" floatingLabelFixed={true} type="text" name="name" value={name} onChange={this.changeHandler}>
                                    </TextField>
                                </div>
                                <div>
                                    <TextField hintText="Enter points" floatingLabelText="Course points" floatingLabelFixed={true} type="text" name="points" value={points} onChange={this.changeHandler}>
                                    </TextField>
                                </div>
                                <br />
                                <RaisedButton label="Submit" type="submit"></RaisedButton>
                            </form>
                        </div>
                        <div className="admin-courses-main-content">
                            <div className="admin-courses-container">
                                <h5>Course </h5>
                                <h5>Points</h5>
                            </div>


                            <div>
                                {!isLoading ? (
                                    courses.map(course => {
                                        const { name, points } = course;
                                        return (
                                            <div className="admin-course-get-div" key={name + 1}>
                                                <p className="admin-course-get">{name}</p>
                                                <p className="admin-course-get admin-course-points">{points}</p>
                                            </div>
                                        );
                                    })
                                ) : (<p>Loading..</p>
                                    )}
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default adminCourse;