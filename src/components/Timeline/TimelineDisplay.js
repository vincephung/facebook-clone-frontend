import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import Header from './Header';
import io from 'socket.io-client';
import AuthenticateHeader from '../../Authentication/AuthenticateHeader';
import Contacts from '../Chatbox/Contacts';
import '../../styles/createPost.css';

const TimelineDisplay = ({ match, logOut }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const url = `https://vincephung-facebook-clone.glitch.me/api/users/${match.params.id}`;
        const response = await fetch(url, {
          method: 'get',
          mode: 'cors',
          headers: AuthenticateHeader(),
        });
        const userData = await response.json();
        setCurrentUser(userData);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, [match.params.id]);

  const socket = io.connect('localhost:4000', {
    transports: ['websocket', 'polling', 'flashsocket'],
  });

  useEffect(() => {
    socket.emit('connection', currentUser._id);
    socket.on('connected_users', (usersArr) => {});

    return () => {
      socket.off('connected_users');
    };
  }, [currentUser._id, socket]);

  return (
    <div className="timelineContainer">
      <div className="header">
        <Header
          fullName={`${currentUser.firstName} ${currentUser.lastName}`}
          firstName={currentUser.firstName}
          profilePicture={currentUser.profilePicture}
          user_id={currentUser._id}
          friendRequests={currentUser.friendRequests}
          logOut={logOut}
        />
      </div>
      <div className="timelinePostList">
        <PostList currentUser={currentUser} socket={socket} />
      </div>
      <div className="chat-Section">
        <Contacts currentUser={currentUser} socket={socket} />
      </div>
    </div>
  );
};

export default TimelineDisplay;
