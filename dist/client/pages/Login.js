import React from 'react';
import googleSignIn from '../images/googleSignIn.png';
import '../stylesheets/pages/login.css';
function Login() {
    return (React.createElement("div", { className: "loginContainer" },
        React.createElement("div", { className: "googleSignInButton" },
            React.createElement("a", { href: "/auth/google" },
                React.createElement("img", { src: googleSignIn, alt: "" })))));
}
export default Login;
