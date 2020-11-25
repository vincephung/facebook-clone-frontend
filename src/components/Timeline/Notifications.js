import React, { useState } from 'react';
import AuthenticateHeader from '../../Authentication/AuthenticateHeader';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Notifications = (props) => {
  const [showRequest, setShowRequest] = useState(false);
  const [requestResponse, setRequestResponse] = useState('');

  const handleFriendRequest = async (
    fromUserID,
    toUserID,
    choice,
    requestResponse
  ) => {
    try {
      const url = `https://vincephung-facebook-clone.glitch.me/api/users/friendrequest/${fromUserID}/${toUserID}`;
      let type = choice === 'accept' ? 'put' : 'delete';
      const response = await fetch(url, {
        mode: 'cors',
        method: type,
        headers: AuthenticateHeader(),
      });
      const data = await response.json();
      if (response.status === 200) {
        setShowRequest(true);
        setRequestResponse(requestResponse);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NavDropdown title="Notifications" id="notification-dropdown">
      {props.friendRequests &&
        props.pendingFriendRequests.map((fr) => (
          <NavDropdown.Item>
            <article key={fr._id}>
              <figure>
                <img src={fr.fromUser.profilePicture} alt="" />
                <figcaption>
                  {`${fr.fromUser.firstName} ${fr.fromUser.lastName} sent you a friend request `}
                </figcaption>
              </figure>
              <div className={showRequest ? 'hide' : ''}>
                <button
                  className="acceptRequestBtn"
                  type="button"
                  onClick={() =>
                    handleFriendRequest(
                      fr.fromUser._id,
                      fr.toUser._id,
                      'accept',
                      'Friend request accepted'
                    )
                  }
                >
                  Accept
                </button>
                <button
                  className="declineRequestBtn"
                  type="button"
                  onClick={() =>
                    handleFriendRequest(
                      fr.fromUser._id,
                      fr.toUser._id,
                      'decline',
                      'Friend request declined'
                    )
                  }
                >
                  Decline
                </button>
              </div>
              <div className={showRequest ? 'active' : 'hide'}>
                {requestResponse}
              </div>
            </article>
          </NavDropdown.Item>
        ))}
      {props.pendingFriendRequests.length === 0 && (
        <p>There are no new notifications.</p>
      )}
    </NavDropdown>
  );
};

export default Notifications;
