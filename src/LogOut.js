import {Redirect} from "react-router-dom";

export const handleLogout = () => {
    this.setState({ loggedIn: false});
    localStorage.removeItem('HemligToken');
    this.history.push('/login');

    console.log("Logged out");
    return <Redirect to='/login' />
};