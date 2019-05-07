import React from 'react';

const Profile = (props) => {

    // let students = StudentList.map((person) => {
    //     return (
    //         <div className="student-container">
    //             <h3><Link className="name-container" to={`/students/${person.url}`}>{person.name}</Link></h3>
    //         </div>
    //     );
    // });

    return (
        <div className="main-content">
            {/* <div><Link className="back" to="/students">BACK</Link></div> */}
            <div className="container">
                <h2>{props.title}</h2>
                <h1>Per Persson</h1>
                <h3>19830503-3000</h3>
                <h3>Sommergatan 5</h3>
                <h3>256 56 Malmö</h3>
                {/* {students} */}
            </div>
        </div>
    );
};

export default Profile;