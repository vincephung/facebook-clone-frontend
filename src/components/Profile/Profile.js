import React, { useState, useEffect } from 'react';
import Friends from './Friends';
import Bio from './Bio';
import UserPostList from './UserPostList';
import AuthenticateHeader from '../../Authentication/AuthenticateHeader';
import '../../styles/profile.css';
import Header from '../Timeline/Header';

const Profile = ({ match, currentUser, logOut }) => {
  const [user, setUser] = useState({});
  const [birthday, setBirthday] = useState('');

  useEffect(() => {
    const getUserInfo = async () => {
      const url = `https://vincephung-facebook-clone.glitch.me/api/users/${match.params.id}`;
      const response = await fetch(url, {
        mode: 'cors',
        method: 'GET',
        headers: AuthenticateHeader(),
      });
      let userInfo = await response.json();
      if (response.ok) {
        setUser(userInfo);
        if (userInfo.birthday) {
          setBirthday(
            `${userInfo.birthday.month} ${userInfo.birthday.day}, ${userInfo.birthday.year}`
          );
        }
      }
    };
    getUserInfo();
  }, [match.params.id]);

  return (
    <div className="profileContainer">
      <section className="headerSection">
        <Header
          fullName={`${currentUser.firstName} ${currentUser.lastName}`}
          firstName={currentUser.firstName}
          profilePicture={currentUser.profilePicture}
          user_id={currentUser._id}
          friendRequests={currentUser.friendRequests}
          logOut={logOut}
        />
      </section>
      <section className="bioSection">
        <Bio
          firstName={user.firstName || ''}
          lastName={user.lastName || ''}
          bio={user.bio}
          gender={user.gender}
          joinDate={user.joinDate}
          profilePicture={user.profilePicture}
          coverPicture={user.coverPicture}
          profileUser={user}
          currentUser={currentUser}
          currentUserFriends={currentUser.friends}
          currentUserFriendRequests={currentUser.friendRequests}
        />
      </section>
      <div className="profileContentContainer">
        <div className="infoFriendContainer">
          <section className="infoSection">
            <h1 className="infoHeader">Info</h1>
            <ul>
              <li> {user.gender}</li>
              <li> Join Date: {user.joinDate}</li>
              <li>Birthday: {birthday}</li>
            </ul>
          </section>
          <section className="friendSection">
            <Friends friends={user.friends} />
          </section>
        </div>
        <section className="postSection">
          <UserPostList
            currentUser={currentUser}
            profileUser={user}
            profilePicture={user.profilePicture}
            posts={user.posts}
          />
        </section>
      </div>
    </div>
  );
};

export default Profile;
