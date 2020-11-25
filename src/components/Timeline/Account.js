import React from 'react';
import { Link } from 'react-router-dom';
import logOutIcon from '../../images/log-out.png';
import darkModeIcon from '../../images/dark-mode.png';
import '../../styles/header.css';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Account = (props) => {
  return (
    <>
      <Link to={`/users/profile/${props.user_id}`}>
        <figure className="accountPicture">
          <img src={props.profilePicture} alt="" />
          <figcaption>
            <p>{props.name}</p>
          </figcaption>
        </figure>
      </Link>
      <NavDropdown title="Account" id="basic-nav-dropdown">
        <NavDropdown.Item href="#">
          <div className="option">
            <img src={darkModeIcon} alt="" />
            <p>Dark mode</p>
          </div>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>
          <Link to="/home">
            <button className="option" onClick={props.logOut}>
              <img src={logOutIcon} alt="" />
              <p>Log Out</p>
            </button>
          </Link>
        </NavDropdown.Item>
        <NavDropdown.Divider />
      </NavDropdown>
    </>
  );
};

export default Account;
