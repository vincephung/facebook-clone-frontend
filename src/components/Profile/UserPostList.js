import React, { useState, useEffect } from 'react';
import Post from '../Timeline/Post';
import AuthenticateHeader from '../../Authentication/AuthenticateHeader';
import '../../styles/profile.css';

const UserPostList = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getUserPosts = async () => {
      const url = `https://vincephung-facebook-clone.glitch.me/api/users/${props.profileUser._id}/posts`;
      const response = await fetch(url, {
        mode: 'cors',
        method: 'get',
        headers: AuthenticateHeader(),
      });
      const postInfo = await response.json();
      setPosts(postInfo);
    };
    getUserPosts();
  }, [props.currentUser, props.profileUser._id]);

  const deletePost = async () => {};

  return (
    <div className="postList">
      {posts.map((post) => (
        <Post
          key={post._id}
          text={post.text}
          post_id={post._id}
          user={`${props.profileUser.firstName} ${props.profileUser.lastName}`}
          user_id={post.user._id}
          profilePicture={props.profileUser.profilePicture}
          image={post.image}
          comments={post.comments}
          reactions={post.reactions}
          timestamp={post.timestamp}
          currentUser={props.currentUser}
          deletePost={deletePost}
        />
      ))}
    </div>
  );
};

export default UserPostList;
