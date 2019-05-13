export const getJwt = () => {
    let token = localStorage.getItem('HemligToken');
    return token;
};
