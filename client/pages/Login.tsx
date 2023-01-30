import React from 'react';
import '../stylesheets/pages/login.css'

function Login() {
  return (
    <div className="loginContainer">
      <div className="googleSignInButton">
        <a href="/auth/google">
          <img src='/assets/googleSignIn.png' alt="" />
        </a>
      </div>
    </div>
  );
}

export default Login;
