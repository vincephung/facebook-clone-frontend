import React, { useState, useRef } from 'react';
import defaultPicture from '../../images/default-picture.png';
import Chat from './Chat';

const Friend = (props) => {
  const [showChatBox, setShowChatBox] = useState(false);
  const inputRef = useRef();

  const handleChatBox = () => {
    console.log(showChatBox);
    setShowChatBox(!showChatBox);
  };
  const openChat = () => {
    setShowChatBox(!showChatBox);
    if (!showChatBox) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="chatBoxContainer">
      <figure
        className="friendChatContainer"
        key={props.friend._id}
        onClick={() => openChat()}
      >
        <img src={props.friend.profilePicture || defaultPicture} alt="" />
        <figcaption>{`${props.friend.firstName} ${props.friend.lastName}`}</figcaption>
      </figure>
      <Chat
        friend={props.friend}
        setShowChatBox={setShowChatBox}
        showChatBox={showChatBox}
        inputRef={inputRef}
        socket={props.socket}
        currentUserID={props.currentUserID}
        handleChatBox={handleChatBox}
      />
    </div>
  );
};

export default Friend;
