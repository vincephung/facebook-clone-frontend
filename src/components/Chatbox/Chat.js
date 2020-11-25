import React, { useState, useEffect, useRef } from 'react';
import defaultPicture from '../../images/default-picture.png';

const Chat = (props) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const msgsRef = useRef();
  const chatIdentifier = [props.friend._id, props.currentUserID];

  const sendMessage = (e) => {
    e.preventDefault();
    props.socket.emit('send_message', {
      to: props.friend._id,
      message,
      from: props.currentUserID,
      chatIdentifier,
    });
    setChatMessages(
      chatMessages.concat({
        to: props.friend._id,
        message,
        from: props.currentUserID,
        chatIdentifier,
      })
    );
    setMessage('');
  };

  useEffect(() => {
    props.socket.on('new_message', (message) => {
      if (
        message.chatIdentifier.includes(props.friend._id) &&
        message.chatIdentifier.includes(props.currentUserID)
      ) {
        setChatMessages((prevState) => prevState.concat(message));
        msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
        props.setShowChatBox(true);
      }
    });
    return () => {
      props.socket.off('send_message');
    };
  }, [
    props.socket,
    props.setShowChatBox,
    props.currentUserID,
    props.friend._id,
  ]);

  console.log(props.currentUser);
  if (props.friend) {
    return (
      <div className={props.showChatBox ? 'openChat chat' : 'closeChat chat'}>
        <div className="friend-info">
          <figure className="friendChatContainer">
            <img src={props.friend.profilePicture || defaultPicture} alt="" />
            <figcaption>
              <p>{`${props.friend.firstName} ${props.friend.lastName}`}</p>
              <p>{props.active && 'Active Now'}</p>
            </figcaption>
            <button type="button" onClick={props.handleChatBox}>
              X
            </button>
          </figure>
        </div>
        <div className="messagesContainer" ref={msgsRef}>
          {chatMessages.map((msg, index) => (
            <p
              key={index}
              className={
                msg.id !== props.currentUserID ? 'message' : 'message other'
              }
            >
              {msg.message}
            </p>
          ))}
        </div>
        <form onSubmit={(e) => sendMessage(e)}>
          <input
            type="text"
            placeholder="Send Message"
            ref={props.inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            minLength="1"
          />
          <button></button>
        </form>
      </div>
    );
  }
  return;
};

export default Chat;
