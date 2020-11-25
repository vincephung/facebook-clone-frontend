import React, { useState } from 'react';
import AuthenticateHeader from '../../Authentication/AuthenticateHeader';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../images/facebook-logo-small.png';
import home from '../../images/home.png';
import Account from './Account';
import Notifications from './Notifications';
import '../../styles/header.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Header = (props) => {
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchResults, setSearchResults] = useState('');
  const history = useHistory();

  const pendingFriendRequests = props.friendRequests
    ? props.friendRequests.filter(
        (fr) => fr.status === 'Pending' && fr.toUser._id === props.user_id
      )
    : [];

  const searchPeople = async (e) => {
    e.preventDefault();
    try {
      const url = `https://vincephung-facebook-clone.glitch.me/api/users/${props.user_id}/search?q=${searchResults}`;
      const response = await fetch(url, {
        mode: 'cors',
        method: 'get',
        headers: AuthenticateHeader(),
      });
      const searchInfo = await response.json();
      if (response.status === 200) {
        history.push(`/users/${props.user_id}/search?q=${searchResults}`, {
          searchInfo,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Navbar className="headerNav" bg="light" expand="lg">
      <Nav className="navSection">
        <Form inline onSubmit={(e) => searchPeople(e)}>
          <img src={Logo} alt="" />
          <FormControl
            type="search"
            placeholder="Search"
            onChange={(e) => setSearchResults(e.target.value)}
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
      </Nav>
      <Nav className="navSection">
        <Navbar.Brand href="/home" className="navName">
          Facebook Clone
        </Navbar.Brand>
      </Nav>
      <Nav className="navSection">
        <Link to={`/users/timeline/${props.user_id}`}>
          <img src={home} alt="" />
        </Link>
        <Account
          name={props.firstName}
          profilePicture={props.profilePicture}
          user_id={props.user_id}
          showAccountSettings={showAccountSettings}
          logOut={props.logOut}
        />
        <Notifications
          showNotifications={showNotifications}
          friendRequests={props.friendRequests}
          pendingFriendRequests={pendingFriendRequests}
        />
      </Nav>
    </Navbar>
  );
};

export default Header;
