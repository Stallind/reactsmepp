import React from 'react';
import axios from "axios";
import { getJwt } from "../helpers/jwt";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { white } from 'material-ui/styles/colors';
import jwt_decode from 'jwt-decode';

const muiTheme = getMuiTheme({
    raisedButton: {
        color: 'rgb(23, 54, 75)',
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

class Course extends React.Component {
    constructor(props){
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

    componentDidMount(){
        if(this.state.role !== "Admin"){
            currentApi = `${apiBaseUrlAdmin}${this.state.id}`;
        }

        axios.get(`${currentApi}`)
        .then(response => {
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
        .catch(error => this.setState({error, isLoading: false}));
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    submitHendler = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.post(apiBaseUrl, this.state, {headers: {'Authorization': `Bearer ${jwt}`}
    }).then(response => {
        console.log(response);
        alert('Course has been registered');
    })
    .catch(error => {
        console.log(error);
    });
    }

    render() {
        const { isLoading, courses} = this.state;
        return (
            <div>
            <MuiThemeProvider muiTheme={muiTheme}>
                    <div className="courses-main">
                <div className="courses-main-content">
                    <div className="courses-container">
                        <h5>Course </h5>
                        <h5>Points</h5>
                    </div>
                </div>
                <div className="course-get-div">
                    {!isLoading ? (
                        courses.map(course => {
                            const { name, points} = course;
                            return (
                                <div className="course-name-get" key={name+1}> 
                                <p className="course-get">{name}</p> 
                                <p className="course-get course-points">{points}</p>
                                </div>
                            );
                        })
                    ) : ( <p>Loading..</p>
                    )}
                </div>
                    </div>
            </MuiThemeProvider>
        </div>
        );
    }
}

export default Course;