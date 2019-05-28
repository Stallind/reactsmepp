import React, { Component } from 'react'
import axios from 'axios';
import { getJwt } from "../helpers/jwt";
import jwt_decode from "jwt-decode";

const jwt = getJwt();
let apiBaseUrl = "https://localhost:44339/api/";

class adminGrades extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.getId(),
            courses: [],
            students: [],
            isLoading: true,
            isLoadingUsers:true,
            errors: null,
            courseId:'',
            courseLabel:'',
            userId: '',
            grade: ''
        }
        
    }
    onGradeChanged = (e) => {
        this.setState({
          grade: e.currentTarget.value
          });
          console.log(this.state.grade);
        }
    onUserChanged = (e) => {
        this.setState({
          userId: e.currentTarget.value
          });
          console.log(this.state.userId);
          
        }

    handleChange = (e) => {
        let index = e.nativeEvent.target.selectedIndex;
        let label = e.nativeEvent.target[index].value;
        let value = e.target.value;
        this.setState({ courseId: value, courseLabel: label});
    }

    postGrade = () => {
        axios.post(`${apiBaseUrl}grades`,{
        studentId: this.state.userId,
        graderId: this.state.id,
        courseId: this.state.courseId,
        result: this.state.grade}, { headers: { 'Authorization': `Bearer ${jwt}` } })
        .then(response => {
                console.log(response);
                alert('grade has been added');
            })
            .catch(error => {
                console.log(error);
            });
    }

    getUsers = () =>{
        axios.get(`${apiBaseUrl}applicationUsers/course/${this.state.courseId}`)
        .then(response => {
                console.log(response);
                return response.data.map(student => ({
                    id: `${student.id}`,
                    name: `${student.firstName} ${student.lastName}`,
                    email: `${student.email}`
                }))
            }
        )
        .then(students => {
            this.setState({
                students,
                isLoadingUsers: false
            });
        })
        .catch(error => this.setState({ error, isLoadingUsers: false }));
    } 
    getId = () => {
        let decoded = jwt_decode(jwt);
        return decoded["id"]
    };

    componentDidMount(){
        axios.get(`${apiBaseUrl}courses/user/${this.state.id}`)
        .then(response => {
                console.log(response);
                return response.data.map(course => ({
                    id: `${course.id}`,
                    name: `${course.name}`,
                    result: `${course.points}`
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
        const {isLoading, isLoadingUsers,students} = this.state;
        return (
            <div>
            <h2>Add a Grade</h2>
            <h2>Select course: </h2>
            {!isLoading ? (
            <div>
            <select  onChange={this.handleChange}>
            <option key={'väljkurs'} value="" disabled selected>{'Choose Course'}</option>
                {this.state.courses.map((course) => <option key={course.name} value={course.id}>{course.name}</option>)}
            </select>
            </div>) :
             (<p>Loading...</p>)}
            <button onClick={this.getUsers}>
                choose.
            </button>
            
            <h2>Users</h2>

            {!isLoadingUsers ? (
                <div>
                {students.map(student => {
                            const { name, id} = student;
                            return (
                                <div className="student-name" key={name+1}>
                                
                                <p><input type="radio" name="user" value={id} onChange={this.onUserChanged} /> {name}</p>
                                </div>
                            );
                        })}
                        <input type="radio" name="grade" value="IG" onChange={this.onGradeChanged} />IG
                        <input type="radio" name="grade" value="G" onChange={this.onGradeChanged}/>G    
                        <input type="radio" name="grade" value="VG" onChange={this.onGradeChanged}/>VG
                        <br></br>
                        <button onClick={this.postGrade}>Create Grade</button>
                </div>
                ) :
                 (<p>Choose a course to see users</p>)}
            </div>

        )
    }
}

export default adminGrades
