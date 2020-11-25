import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../styles/loginPage.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import '../../styles/signUpModal.css';

const CreateAccount = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [errors, setErrors] = useState(false);
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'https://vincephung-facebook-clone.glitch.me/api/users/';
    try {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          day,
          month,
          year,
          gender,
        }),
      });
      if (response.ok) {
        const user = await response.json();
        //on successful sign up
        userLogIn();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const userLogIn = async () => {
    const url = 'https://vincephung-facebook-clone.glitch.me/api/users/log-in';
    try {
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
      } else {
        setErrors(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const dateNumbers = [];
  const yearNumbers = [];
  var d = new Date();
  var n = d.getFullYear();
  for (let i = 1; i <= 31; i++) {
    dateNumbers.push(<option key={i}>{i}</option>);
  }
  for (let i = n; i > 1950; i--) {
    yearNumbers.push(<option key={i}>{i}</option>);
  }

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Create Account
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="modalHeader">
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formGroupFirstName">
                  <Form.Control
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formGroupLastName">
                  <Form.Control
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formGroupEmail">
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Control
                name="password"
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Label>Birthday</Form.Label>
            <Row>
              <Col xs={6} md={4}>
                <Form.Group controlId="formSelectBirthday">
                  <Form.Control
                    as="select"
                    custom
                    required
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    <option selected>Month</option>
                    <option>Jan</option>
                    <option>Feb</option>
                    <option>Mar</option>
                    <option>Apr</option>
                    <option>May</option>
                    <option>Jun</option>
                    <option>Jul</option>
                    <option>Aug</option>
                    <option>Sep</option>
                    <option>Oct</option>
                    <option>Nov</option>
                    <option>Dec</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={6} md={4}>
                <Form.Group controlId="formSelectBirthday">
                  <Form.Control
                    as="select"
                    custom
                    onChange={(e) => setDay(e.target.value)}
                  >
                    <option selected>Day</option>
                    {dateNumbers}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={6} md={4}>
                <Form.Group controlId="formSelectBirthday">
                  <Form.Control
                    as="select"
                    custom
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option selected>Year</option>
                    {yearNumbers}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Label>Gender</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Male"
                  type={type}
                  id={`inline-${type}-Male`}
                  onChange={(e) => setGender(e.target.value)}
                  value="Male"
                  checked={gender === 'Male'}
                />
                <Form.Check
                  inline
                  label="Female"
                  type={type}
                  id={`inline-${type}-Female`}
                  value="Female"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === 'Female'}
                />
                <Form.Check
                  inline
                  label="Other"
                  type={type}
                  id={`inline-${type}-Other`}
                  value="Other"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === 'Other'}
                />
              </div>
            ))}
            <p className="signUpInfo">
              By clicking Sign Up, you agree to our Terms, Data Policy and
              Cookies Policy. You may receive SMS Notifications from us and can
              opt out any time
            </p>
          </Container>
        </Modal.Body>
        <div className="signUpBtnContainer"></div>
        <Button variant="success" className="signUpBtn" onClick={handleSubmit}>
          Sign Up
        </Button>
      </Modal>
    </>
  );
};

export default CreateAccount;
