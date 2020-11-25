import React from 'react';
import AuthenticateHeader from '../../Authentication/AuthenticateHeader';
import like from '../../images/like-reaction.png';
import love from '../../images/love.png';
import haha from '../../images/haha.png';
import wow from '../../images/wow.png';
import sad from '../../images/sad.png';
import angry from '../../images/angry.png';
import '../../styles/post.css';

const Reactions = (props) => {
  const addReaction = async (type) => {
    const url = `https://vincephung-facebook-clone.glitch.me/api/posts/${props.post_id}/reactions`;
    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: AuthenticateHeader(),
      body: JSON.stringify({ type: type, user_id: props.user_id }),
    });
    const data = await response.json();
    if (response.ok) {
      props.setPostReactions((postReactions) => postReactions.concat(data));
    }
  };
  return (
    <div className="reactionContainer">
      <button
        className="reaction-like reactionType"
        onClick={() => addReaction('Like')}
      >
        <img src={like} alt="" />
        <span className="legend-reaction">Like</span>
      </button>
      <button
        className="reaction-love reactionType"
        onClick={() => addReaction('Love')}
      >
        <img src={love} alt="" />
        <span className="legend-reaction">Love</span>
      </button>
      <button
        className="reaction-haha reactionType"
        onClick={() => addReaction('Haha')}
      >
        <img src={haha} alt="" />
        <span className="legend-reaction">Haha</span>
      </button>
      <button
        className="reaction-wow reactionType"
        onClick={() => addReaction('Wow')}
      >
        <img src={wow} alt="" />
        <span className="legend-reaction">Wow</span>
      </button>
      <button
        className="reaction-sad reactionType"
        onClick={() => addReaction('Sad')}
      >
        <img src={sad} alt="" />
        <span className="legend-reaction">Sad</span>
      </button>
      <button
        className="reaction-angry reactionType"
        onClick={() => addReaction('Angry')}
      >
        <img src={angry} alt="" />
        <span className="legend-reaction">Angry</span>
      </button>
    </div>
  );
};

export default Reactions;
