import React from 'react';
import axios from "axios";

let apiBaseUrl = "https://localhost:44339/api/courses";

// axios.get(apiBaseUrl)
//     .then( response => {
//     console.log(response.data);
//         return response.data;
//     });

class ProtectedPage extends React.Component {
    state = {
        courses: [],
        isLoading: true,
        errors: null
    };

    componentDidMount()  {
        axios.get(apiBaseUrl)
            // Once we get a response, we'll map the API endpoints to our props
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

//           response.data.results.map(courses => ({
//                     name: `${courses.name}`,
//                     points: `${courses.points}`
//                 }))



// const ProtectedPage = () => {
//
//     return (
//             <React.Fragment>
//                 <h1>
//                     Your courses are {}
//                 </h1>
//             </React.Fragment>
//
//     );
// };

export default ProtectedPage;
