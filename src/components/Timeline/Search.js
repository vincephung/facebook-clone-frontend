import React from 'react';
import Header from './Header';
import defaultPicture from '../../images/default-picture.png';
import { Link } from 'react-router-dom';

const Search = ({ currentUser, logOut, location }) => {
  const people = location.state.searchInfo;
  const friendsID =
    currentUser.friends && currentUser.friends.map((friend) => friend._id);
  return (
    <>
      <Header
        username={currentUser.firstName}
        profile_picture={currentUser.profilePicture}
        user_id={currentUser._id}
        full_name={`${currentUser.firstName} ${currentUser.lastName}`}
        friend_requests={currentUser.friendRequests}
        logOut={logOut}
      />
      <h2>People</h2>
      <section className="search-people">
        {people.length > 0 ? (
          people.map((person) => (
            <figure key={person._id}>
              <Link to={`/users/profile/${person._id}`}>
                <img src={person.profilePicture || defaultPicture} alt="" />
                <figcaption>{`${person.firstName} ${person.lastName}`}</figcaption>
              </Link>
              {friendsID && friendsID.includes(person._id) ? (
                <div className="action">Friend</div>
              ) : (
                <Link to={`/users/${person._id}/profile`}>
                  <div className="action">
                    {person._id === currentUser._id ? ' You ' : 'See profile'}
                  </div>
                </Link>
              )}
            </figure>
          ))
        ) : (
          <p>No users found. Try another name.</p>
        )}
      </section>
    </>
  );
};
export default Search;
