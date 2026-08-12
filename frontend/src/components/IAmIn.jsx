import React from 'react';
import { post } from '../utils/api.js';
import styles from './IAmIn.module.css';
import PropTypes from 'prop-types';

function IAmIn(props) {
  var postId = props.postId;
  var [joined, setJoined] = React.useState(false);
  var [message, setMessage] = React.useState('');

  function handleClick() {
    var username = props.username;

    if (username === null || username === '') {
      setMessage('Please log in to join this meetup.');
      return;
    }

    post('/api/meetups', { postId: postId, username: username }).then(
      function (data) {
        if (data.message === 'Already joined') {
          setMessage('You are already in this meetup.');
        } else {
          setJoined(true);
          setMessage('You are in!');
        }
      },
    );
  }

  if (joined === true) {
    return (
      <div className={styles.iamIn}>
        <button
          className={`${styles.iamInBtn} ${styles.iamInBtnJoined}`}
          disabled
        >
          You are in
        </button>
        <p className={styles.iamInMsg}>{message}</p>
      </div>
    );
  }

  return (
    <div className={styles.iamIn}>
      <button className={styles.iamInBtn} onClick={handleClick}>
        I am in
      </button>
      {message !== '' && <p className={styles.iamInMsg}>{message}</p>}
    </div>
  );
}

IAmIn.propTypes = {
  postId: PropTypes.string,
  username: PropTypes.string,
};

export default IAmIn;