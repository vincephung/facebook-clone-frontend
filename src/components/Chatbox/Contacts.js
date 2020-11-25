import React from 'react';
import Friend from './Friend';

const Contacts = (props) => {
  return (
    <section className="contacts-chat">
      <h3>Contacts</h3>
      {props.currentUser.friends &&
        props.currentUser.friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend._id}
            socket={props.socket}
            currentUserID={props.currentUser._id}
            currentUser={props.currentUser}
          />
        ))}
    </section>
  );
};

export default Contacts;
