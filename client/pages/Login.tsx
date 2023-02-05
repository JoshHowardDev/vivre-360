import React from 'react';
import googleSignIn from '../images/googleSignIn.png';
import '../stylesheets/pages/login.css';

function Login() {
  return (
    <div className="loginContainer">
      <div className="googleSignInButton">
        <a href="/auth/google">
          <img src={googleSignIn} alt="" />
        </a>
      </div>
    </div>
  );
}

export default Login;
