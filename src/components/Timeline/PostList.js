import React, { useState, useEffect } from 'react';
import AuthenticateHeader from '../../Authentication/AuthenticateHeader';
import Loader from './Loader';
import CreatePost from './CreatePost';
import Post from './Post';
import '../../styles/post.css';

const PostList = ({ socket, currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [displayLoader, setDisplayLoader] = useState(true);
  const friends =
    currentUser.friends && currentUser.friends.map((friend) => friend._id);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const getPosts = async () => {
      const url = 'https://vincephung-facebook-clone.glitch.me/api/posts';
      const response = await fetch(url, {
        mode: 'cors',
        method: 'get',
        headers: AuthenticateHeader(),
        signal,
      });

      const data = await response.json();
      setPosts(data);
      setDisplayLoader(false);
      socket.on('new_post', (post) => {
        if (
          post.user._id !== currentUser._id &&
          friends.includes(post.user._id)
        ) {
          setPosts((posts) => [post, ...posts]);
        }
      });
    };
    if (currentUser._id) {
      getPosts();
    }
    //else
    return function () {
      abortController.abort();
      socket.off('new_post');
    };
  }, [currentUser._id]);

  const deletePost = async (post_id, setShowPostActions) => {
    const url = `https://vincephung-facebook-clone.glitch.me/api/posts/${post_id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      headers: AuthenticateHeader(),
    });
    if (response.ok) {
      const data = await response.json();
      setPosts((prevState) => prevState.filter((post) => post._id !== post_id));
      setShowPostActions(false);
    }
  };

  return (
    <>
      <div className="timelinePostContainer">
        <CreatePost
          name={currentUser.firstName}
          profilePicture={currentUser.profilePicture}
          user_id={currentUser._id}
          setPosts={setPosts}
          socket={socket}
        />
        {displayLoader ? <Loader /> : ''}
        <div className="postListContainer">
          {posts.map((post) => (
            <Post
              key={post._id}
              post_id={post._id}
              user={`${post.user.firstName} ${post.user.lastName}`}
              profilePicture={post.user.profilePicture}
              text={post.text}
              timestamp={post.timeStamp}
              picture={post.picture}
              comments={post.comments}
              reactions={post.reactions}
              currentUser={currentUser}
              user_id={post.user._id}
              deletePost={deletePost}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PostList;
