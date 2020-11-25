import React, { useState, useEffect } from 'react';
import AuthenticateHeader from '../../Authentication/AuthenticateHeader';

const EditPostForm = (props) => {
  const [text, setText] = useState(props.oldText || '');

  const editPost = async (e) => {
    e.preventDefault();
    try {
      const url = `https://vincephung-facebook-clone.glitch.me/api/posts/${props.post_id}`;
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: AuthenticateHeader(),
        body: JSON.stringify({ text }),
      });
      if (response.ok) {
        const data = await response.json();
        props.setShowEditForm(!props.showEditForm);
        props.setPostText(text);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {props.showEditForm ? (
        <form className="editPostForm" onSubmit={(e) => editPost(e)}>
          <input
            type="text"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button>Edit Post</button>
        </form>
      ) : (
        ''
      )}
    </>
  );
};

export default EditPostForm;
