import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import '../../styles/signUpModal.css';
import AuthenticateHeader from '../../Authentication/AuthenticateHeader';
import { useHistory } from 'react-router-dom';
import '../../styles/profile.css';

const EditProfileForm = (props) => {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState(props.userFirstName);
  const [lastName, setLastName] = useState(props.userLastName);
  const [bio, setBio] = useState(props.userBio);
  const [profilePicture, setProfilePicture] = useState(props.profilePicture);
  const [coverPicture, setCoverPicture] = useState(props.coverPicture);
  const [profilePicturePreview, setProfilePicturePreview] = useState('');
  const [coverPicturePreview, setCoverPicturePreview] = useState('');
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateProfile = async (e) => {
    e.preventDefault();
    const url = `https://vincephung-facebook-clone.glitch.me/api/users/${props.currentUser._id}`;
    const userInfo = {
      profilePicture: profilePicture || props.profilePicture,
      coverPicture: coverPicture || props.coverPicture,
      bio: bio || props.bio,
      firstName: firstName || props.firstName,
      lastName: lastName || props.lastName,
    };
    const response = await fetch(url, {
      mode: 'cors',
      method: 'PUT',
      headers: AuthenticateHeader(),
      body: JSON.stringify(userInfo),
    });
    if (response.ok) {
      const user = await response.json();
      history.push({
        pathname: `/users/profile/${props.currentUser._id}`, //change this pathname
      });
      window.location.reload();
      return;
    }
  };

  const handleFile = (e, setPicture, setPreview) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = () => {
      setPicture(fileReader.result);
    };
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Edit Profile
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        encType="multipart/form-data"
      >
        <Modal.Header closeButton className="modalHeader">
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <form
          className={'editForm'}
          onSubmit={(e) => updateProfile(e)}
          encType="multipart/form-data"
        >
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
              <Row>
                <Col>
                  <Form.Group controlId="formGroupBio">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="bio"
                      type="textarea"
                      placeholder="Bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formGroupBio">
                    <img src={profilePicturePreview || profilePicture} alt="" />
                    <Form.File
                      type="file"
                      name="profilePicture"
                      onChange={(e) =>
                        handleFile(
                          e,
                          setProfilePicture,
                          setProfilePicturePreview
                        )
                      }
                      id="profilePictureFormControl"
                      label="New Profile Picture"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formGroupBio">
                    <img src={coverPicturePreview || coverPicture} alt="" />
                    <Form.File
                      type="file"
                      name="coverPicture"
                      onChange={(e) =>
                        handleFile(e, setCoverPicture, setCoverPicturePreview)
                      }
                      id="coverPictureFormControl"
                      label="New Cover Picture"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <div className="editProfileBtnContainer"></div>
          <Button variant="success" className="editProfileBtn" type="submit">
            Submit
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditProfileForm;
