import React from 'react';
import defaultPicture from '../../images/default-picture.png';
import { Link } from 'react-router-dom';
import moment from 'moment';
import '../../styles/post.css';

const Comments = (props) => {
  return (
    <div className="commentContainer">
      {props.comments.map((comment) => (
        <figure key={comment._id}>
          <Link to={`/users/profile/${comment.user._id}`}>
            <img
              src={comment.user.profilePicture || defaultPicture}
              alt=""
              className="commentImage"
            />
          </Link>
          <figcaption>
            <Link to={`/users/profile/${comment.user._id}`}>
              <p className="commenterName">{`${comment.user.firstName} ${comment.user.lastName}`}</p>
            </Link>
            <p className="commentText">{comment.text}</p>
          </figcaption>
          <p className="timestamp">{comment.timeStamp}</p>
        </figure>
      ))}
    </div>
  );
};

export default Comments;
