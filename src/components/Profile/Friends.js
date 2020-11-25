import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/profile.css';
import Button from 'react-bootstrap/Button';

const Friends = (props) => {
  return (
    <section className="friendSection">
      <h2>
        Friends
        <Button variant="primary">See All Friends</Button>
      </h2>
      {props.friends && (
        <>
          <p>{props.friends.length} friends</p>
          <div className="friendsList">
            {props.friends.map((friend) => (
              <Link
                to={`/users/profile/${friend._id}`}
                key={`${friend.firstName} ${friend.lastName}`}
              >
                <figure>
                  <img src={friend.profilePicture || ''} alt="" />
                  <figcaption>
                    {`${friend.firstName} ${friend.lastName}`}{' '}
                  </figcaption>
                </figure>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Friends;
