import React from 'react';
import LoginForm from './LoginForm';
import '../../styles/loginPage.css';
import { Redirect } from 'react-router-dom';

const LoginPage = ({ loggedIn }) => {
  //if user is logged in then redirect to their timeline.
  if (loggedIn.token) {
    return <Redirect to={`/users/timeline/${loggedIn.user_id}`} />;
  }

  return (
    <div className="loginContainer">
      <div className="welcomeMessage">
        <div className="messageContainer">
          <h1 className="messageHeader">facebook</h1>
          <p>Connect with your friends and the world</p>
          <p>around you on Facebook.</p>
        </div>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
