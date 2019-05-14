import React from 'react';

const Home = (props) => {
    return (
        <div className="main-content">
            <div className="container">
                <h2>{props.title}</h2>
                <h3>hello from home</h3>


            </div>
        </div>
    )
};

export default Home;