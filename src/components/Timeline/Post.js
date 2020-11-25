import React, { useState, useRef } from 'react';
import AuthenticateHeader from '../../Authentication/AuthenticateHeader';
import EditPostForm from './EditPostForm';
import Comments from './Comments';
import Reactions from './Reactions';
import like from '../../images/like-reaction.png';
import love from '../../images/love.png';
import haha from '../../images/haha.png';
import wow from '../../images/wow.png';
import sad from '../../images/sad.png';
import angry from '../../images/angry.png';
import defaultPicture from '../../images/default-picture.png';
import pen from '../../images/pen.png';
import deleteIcon from '../../images/delete.png';
import commentPicture from '../../images/comment.png';
import { Link } from 'react-router-dom';
import '../../styles/post.css';
import Button from 'react-bootstrap/Button';

const Post = (props) => {
  // console.log(props);
  const [postText, setPostText] = useState(props.text || '');
  const [postComments, setPostComments] = useState(props.comments);
  const [commentAmount, setCommentAmount] = useState(
    props.comments.length || 0
  );
  const [comment, setComment] = useState('');
  const [postReactions, setPostReactions] = useState(props.reactions);
  const [showPostActions, setShowPostActions] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  const handleReactions = () => {
    setShowReactions(!showReactions);
  };
  const currentUserID = props.currentUser._id
    ? props.currentUser._id
    : props.currentUser;

  const createComment = async (e) => {
    e.preventDefault();
    const url = `https://vincephung-facebook-clone.glitch.me/api/posts/${props.post_id}/comments`;
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: AuthenticateHeader(),
      body: JSON.stringify({ text: comment, user_id: props.currentUser }),
    });

    const data = await response.json();
    setComment('');
    setPostComments((comments) => comments.concat(data));
    setCommentAmount(postComments.length + 1);
  };

  const likeSize = postReactions.filter((reaction) => reaction.type === 'Like')
    .length;
  const loveSize = postReactions.filter((reaction) => reaction.type === 'Love')
    .length;
  const hahaSize = postReactions.filter((reaction) => reaction.type === 'Haha')
    .length;
  const wowSize = postReactions.filter((reaction) => reaction.type === 'Wow')
    .length;
  const sadSize = postReactions.filter((reaction) => reaction.type === 'Sad')
    .length;
  const angrySize = postReactions.filter(
    (reaction) => reaction.type === 'Angry'
  ).length;
  const reactionSizes = [
    { type: likeSize, img: like, key: 1 },
    { type: loveSize, img: love, key: 2 },
    { type: hahaSize, img: haha, key: 3 },
    { type: wowSize, img: wow, key: 4 },
    { type: sadSize, img: sad, key: 5 },
    { type: angrySize, img: angry, key: 6 },
  ];

  const sortReactions = reactionSizes.sort((a, b) => b.type - a.type);

  const commentInput = useRef();
  const focusCommentInput = () => {
    commentInput.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    commentInput.current.focus();
  };

  //if you are the current user, then you can edit the your post
  return (
    <div className="postContainer">
      {currentUserID === props.user_id ? (
        <div
          className="post-action-options"
          onClick={() => setShowPostActions(!showPostActions)}
        >
          Edit Post&sdot;&sdot;&sdot;
          {showPostActions && (
            <div className="buttonsWrapper">
              <div>
                <button
                  type="button"
                  onClick={() => setShowEditForm(!showEditForm)}
                >
                  <img src={pen} alt="" />
                  Edit Post
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={(e) =>
                    props.deletePost(props.post_id, setShowPostActions)
                  }
                >
                  <img src={deleteIcon} alt="" />
                  Delete Post
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
      <Link to={`/users/profile/${props.user_id}`}>
        <figure className="userInfo">
          <img
            className="postProfilePicture"
            src={props.profilePicture || defaultPicture}
            alt="profilePicture"
          />
          <figcaption>
            <p className="username">{props.user}</p>
            <p className="timestamp">{props.timestamp}</p>
          </figcaption>
        </figure>
      </Link>
      {currentUserID === props.user_id && (
        <EditPostForm
          oldText={props.text}
          showEditForm={showEditForm}
          setShowEditForm={setShowEditForm}
          post_id={props.post_id}
          setPostText={setPostText}
        />
      )}
      <figure className="post-text" onClick={() => setShowPostActions(false)}>
        {!showEditForm && <figcaption>{postText}</figcaption>}
        <img className="postImage" src={props.picture || ''} alt="" />
      </figure>
      {showReactions ? (
        <div className="postReactionContainer">
          <ul className="reactionList">
            {sortReactions.map(
              (reaction) =>
                !!reaction.type && (
                  <li key={reaction.key}>
                    <img src={reaction.img} alt="" />
                    <span className="reactionAmount">{reaction.type}</span>
                  </li>
                )
            )}
          </ul>
        </div>
      ) : (
        ''
      )}

      <div className="reactionsComments">
        <div className="reactionBtns">
          <Reactions
            post_id={props.post_id}
            user_id={props.currentUser}
            setPostReactions={setPostReactions}
          />
          <button className="postReactionAmount" onClick={handleReactions}>
            {postReactions.length > 0 ? postReactions.length : ''}
          </button>
        </div>
        <p className="commentNumber">{`${commentAmount} comments`}</p>
      </div>
      <hr />
      <div className="likeComment">
        <div className="likeBtnContainer">
          <button className="likeBtn">
            <img src={like} className="likeCommentImg" alt="" />
            Like
          </button>
        </div>
        <div className="commentBtnContainer">
          <button className="commentBtn" onClick={focusCommentInput}>
            <img src={commentPicture} className="likeCommentImg" alt="" />
            Comment
          </button>
        </div>
      </div>
      <hr />
      <Comments comments={postComments} />
      <form className="createComment" onSubmit={(e) => createComment(e)}>
        <img
          className="postProfilePicture"
          src={props.profilePicture || defaultPicture}
          alt=""
        />
        <input
          type="text"
          placeholder="Write a comment..."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          ref={commentInput}
          required
        />
        <Button>Comment</Button>
      </form>
    </div>
  );
};

export default Post;
