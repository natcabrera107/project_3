import React from 'react';
import { get } from '../utils/api.js';
import styles from './MyMeetups.module.css';
import PropTypes from 'prop-types';

function MyMeetups(props) {
  var username = props.username;
  var [meetups, setMeetups] = React.useState([]);
  var [posts, setPosts] = React.useState({});

  React.useEffect(
    function () {
      if (username === null || username === '') {
        return;
      }
      get('/api/meetups?username=' + username).then(function (data) {
        setMeetups(data);
        for (var i = 0; i < data.length; i++) {
          var meetup = data[i];
          get('/api/posts/' + meetup.postId).then(function (postData) {
            setPosts(function (prev) {
              var updated = Object.assign({}, prev);
              updated[postData._id] = postData;
              return updated;
            });
          });
        }
      });
    },
    [username],
  );

  if (username === null || username === '') {
    return (
      <div className={styles.myMeetups}>
        <p>Please log in to see your meetups.</p>
      </div>
    );
  }

  if (meetups.length === 0) {
    return (
      <div className={styles.myMeetups}>
        <p>You have not joined any meetups yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.myMeetups}>
      <h2>My Meetups</h2>
      <ul className={styles.meetupsList}>
        {meetups.map(function (meetup) {
          return (
            <li key={meetup._id} className={styles.meetupItem}>
              {posts[meetup.postId] && (
                <p className={styles.meetupTitle}>{posts[meetup.postId].title}</p>
              )}
              {posts[meetup.postId] && (
                <p className={styles.meetupEventDate}>
                  {posts[meetup.postId].eventDate} at{' '}
                  {posts[meetup.postId].eventTime}
                </p>
              )}
              <p className={styles.meetupDate}>
                Joined: {new Date(meetup.joinedAt).toLocaleDateString()}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

MyMeetups.propTypes = {
  username: PropTypes.string,
};

export default MyMeetups;