import React, { Component } from 'react'
import axios from 'axios';
import { getJwt } from "../helpers/jwt";

const jwt = getJwt();
let apiBaseUrl = "https://localhost:44339/api/";

class adminGrades extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            id: this.props.user.id,
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
        };

    onUserChanged = (e) => {
        this.setState({
          userId: e.currentTarget.value
          });
        };

    handleChange = (e) => {
        let index = e.nativeEvent.target.selectedIndex;
        let label = e.nativeEvent.target[index].value;
        let value = e.target.value;
        this.setState({ courseId: value, courseLabel: label});
    };

    postGrade = () => {
        axios.post(`${apiBaseUrl}grades`,{
        studentId: this.state.userId,
        graderId: this.state.id,
        courseId: this.state.courseId,
        result: this.state.grade}, { headers: { 'Authorization': `Bearer ${jwt}` } })
        .then(response => {

                alert('Grade has been added');
            })
            .catch(error => {
                console.log(error);
            });
    };

    getUsers = () =>{
        axios.get(`${apiBaseUrl}applicationUsers/course/${this.state.courseId}`)
        .then(response => {

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
    };

    componentDidMount(){
        axios.get(`${apiBaseUrl}courses/user/${this.state.id}`)
        .then(response => {

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
        const {isLoading, isLoadingUsers, students} = this.state;
        return (
            <div className="grates-main">
            <h2>Select course: </h2>
            {!isLoading ? (
            <div>
            <select defaultValue={-1} onChange={this.handleChange}>
                <option value="-1" disabled>Select a type</option>
                {this.state.courses.map((course) => <option key={course.name} value={course.id}>{course.name}</option>)}
            </select>
            </div>) :
             (<p>Loading...</p>)}
             <br/>
            <button onClick={this.getUsers}>
                Submit
            </button>
            
            <h2>Users</h2>

            {!isLoadingUsers ? (
                <div>
                {students.map(student => {
                            const { name, id} = student;
                            return (
                                <div className="student-name" key={name+1}>
                                
                                    <p><input className="grates-input" type="radio" name="user" value={id} onChange={this.onUserChanged} /> {name}</p>
                                </div>
                            );
                        })}
                        <input className="grates-input" type="radio" name="grade" value="IG" onChange={this.onGradeChanged} />IG
                        <input className="grates-input" type="radio" name="grade" value="G" onChange={this.onGradeChanged}/>G    
                        <input className="grates-input" type="radio" name="grade" value="VG" onChange={this.onGradeChanged}/>VG
                        <br/><br/>
                        <button onClick={this.postGrade}>Create Grade</button>
                </div>
                ) :
                 (<p>Choose a course to see users</p>)}
            </div>

        )
    }
}

export default adminGrades
