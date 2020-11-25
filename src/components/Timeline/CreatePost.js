import React, { useState } from 'react';
import AuthenticateHeader from '../../Authentication/AuthenticateHeader';
import addPhoto from '../../images/add-photo.png';
import defaultPicture from '../../images/default-picture.png';
import '../../styles/createPost.css';
import Button from 'react-bootstrap/Button';

const CreatePost = (props) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const [errors, setErrors] = useState([]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const url = 'https://vincephung-facebook-clone.glitch.me/api/posts';
    try {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: AuthenticateHeader(),
        body: JSON.stringify({
          text: text,
          picture: image,
          user_id: props.user_id,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        props.setPosts((posts) => [data.newPost, ...posts]);
        props.socket.emit('new_post', data.post);
        setImage('');
        setText('');
        setImgPreview('');
        props.getPosts();
      } else {
        setErrors(data.errors);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFile = (e) => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  return (
    <form
      className="createPostForm"
      onSubmit={handleCreate}
      encType="multipart/form-data"
    >
      <div className="createPostHeader">
        <img
          src={props.profilePicture || defaultPicture}
          alt=""
          className="profilePicture"
        />
        <textarea
          name="postText"
          onChange={(e) => setText(e.target.value)}
          placeholder={`What's on your mind, ${props.name || ''}?`}
          className="postText"
          value={text}
          autoComplete="off"
          rows="2"
        ></textarea>
      </div>
      <img src={imgPreview} alt="" className="image-preview" />
      <label htmlFor="image" className="file-input">
        <img src={addPhoto} alt="" />
        Add a photo
        <input
          type="file"
          name="image"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => handleFile(e)}
        />
      </label>
      <ul className="errors">
        {errors.map((error) => (
          <li key={error.msg}>{error.msg}</li>
        ))}
      </ul>
      <Button type="submit" variant="primary">
        Post
      </Button>
    </form>
  );
};

export default CreatePost;
