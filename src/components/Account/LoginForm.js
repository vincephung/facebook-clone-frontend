import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CreateAccountModal from './CreateAccountModal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import '../../styles/loginForm.css';

const LoginForm = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = 'https://vincephung-facebook-clone.glitch.me/api/users/log-in';
    const response = await fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const user = await response.json();
    //if successful login
    if (user.token) {
      localStorage.setItem('user', JSON.stringify(user));
      history.push({
        pathname: `/home`,
      });
      window.location.reload();
      return;
    }
    //if wrong username / password
    setError(true);
    setEmail('');
    setPassword('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === 'email' ? setEmail(value) : setPassword(value);
  };

  return (
    <div className="formContainer">
      <Form className="loginForm" onSubmit={handleLogin}>
        <Form.Group controlId="formGroupEmail">
          <Form.Control
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
        <a href="#">Forgot Password?</a>
        <hr />
        <div className="btnContainer">
          <CreateAccountModal />
        </div>
        <p>{error ? 'Email or password are incorrect' : ''}</p>
      </Form>
    </div>
  );
};

export default LoginForm;
