import React from 'react';
import '../stylesheets/pages/login.css';
function Login() {
    return (React.createElement("div", { className: "loginContainer" },
        React.createElement("div", { className: "googleSignInButton" },
            React.createElement("a", { href: "/auth/google" },
                React.createElement("img", { src: '/assets/googleSignIn.png', alt: "" })))));
}
export default Login;
