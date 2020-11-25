import React, { useState, useRef } from 'react';
import AuthenticateHeader from '../../Authentication/AuthenticateHeader';
import EditProfileForm from './EditProfileForm';
import '../../styles/profile.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DefaultPicture from '../../images/default-picture.png';

import Phone from '../../images/phone.png';

//if current user == profile user then you can edit profile,
//if they are not the same people, then you can send friend reuqest OR SHOW FRIENDSHIP STATUS
const Bio = (props) => {
  const [showEditProfileForm, setShowEditProfileForm] = useState(false);
  const [addFriendBtnText, setAddFriendBtnText] = useState('Add friend');
  const isCurrentUserFriend =
    props.currentUserFriends &&
    props.currentUserFriends.some(
      (friend) => friend._id === props.profileUser._id
    );

  const hasSentRequest =
    props.currentUserFriendRequests &&
    props.currentUserFriendRequests.some(
      (fr) => fr.toUser === props.profileUser._id
    );

  const addFriendRef = useRef();
  const switchFormState = () => {
    setShowEditProfileForm(!showEditProfileForm);
  };

  const sendFriendRequest = async () => {
    try {
      const url = `https://vincephung-facebook-clone.glitch.me/api/users/friendrequest/${props.currentUser._id}/${props.profileUser._id}`;
      const response = await fetch(url, {
        method: 'post',
        mode: 'cors',
        headers: AuthenticateHeader(),
      });
      const data = await response.json();
      if (response.status === 200) {
        addFriendRef.current.disabled = true;
        setAddFriendBtnText(data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="bioSection">
      <div className="profileImages">
        <div className="coverPictureContainer">
          <img src={props.coverPicture} alt="" />
        </div>
        <img src={props.profilePicture || DefaultPicture} alt="" />
      </div>
      <div className="profileInfo">
        <h1 className="userName">
          {props.firstName} {props.lastName}
        </h1>
        <p className="bioText">{props.bio}</p>
      </div>
      {!isCurrentUserFriend &&
      props.profileUser._id !== props.currentUser._id &&
      !hasSentRequest &&
      hasSentRequest !== undefined ? (
        <button
          className="add-friend"
          type="button"
          onClick={sendFriendRequest}
          ref={addFriendRef}
        >
          {addFriendBtnText}
        </button>
      ) : (
        ''
      )}
      {isCurrentUserFriend ? (
        <p>
          <i>Friends</i>
        </p>
      ) : props.profileUser._id !== props.currentUser._id ? (
        <p>
          <i>Friend Request Pending</i>
        </p>
      ) : (
        ''
      )}
      {props.currentUser._id === props.profileUser._id ? (
        <EditProfileForm
          currentUser={props.currentUser}
          userFirstName={props.firstName}
          userLastName={props.lastName}
          userProfilePicture={props.profilePicture}
          userCoverPicture={props.coverPicture}
          userBio={props.bio}
        />
      ) : (
        ''
      )}
      <hr />
      <div className="profileBar">
        <Navbar bg="light" variant="light">
          <Nav className="mr-auto">
            <Nav.Link href="#">Posts</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Friends</Nav.Link>
            <Nav.Link href="#">Videos</Nav.Link>
            <NavDropdown
              title="More"
              id="collasible-nav-dropdown"
            ></NavDropdown>
            <div className="profileBtnContainer">
              <ul className="profileBtnList">
                <li>
                  <button className="msgBtn profileBtn">
                    <p>Message</p>
                  </button>
                </li>
                <li>
                  <button className="callBtn profileBtn">
                    <img src={Phone} />
                  </button>
                </li>
                <li>
                  <button className="addFriendBtn profileBtn"></button>
                </li>
                <li>
                  <button className="dotBtn profileBtn">...</button>
                </li>
              </ul>
            </div>
          </Nav>
        </Navbar>
      </div>
    </section>
  );
};

export default Bio;
