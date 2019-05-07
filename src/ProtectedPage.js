import React from 'react';
import axios from "axios";

let apiBaseUrl = "https://localhost:44339/api/courses";

let result = axios.get(apiBaseUrl)
    .then( response => {

        return response.data;
    });

console.log(result);

const ProtectedPage = () => {

    return (
            <React.Fragment>
                <h1>
                    Your courses are {result.length}
                </h1>
            </React.Fragment>

    );
};


export default ProtectedPage;
