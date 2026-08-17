import React from 'react';
import { get } from '../utils/api.js';
import styles from './AttendeeList.module.css';
import PropTypes from 'prop-types';

function AttendeeList(props) {
  var postId = props.postId;
  var [attendees, setAttendees] = React.useState([]);

  React.useEffect(
    function () {
      if (postId === null || postId === '') {
        return;
      }
      get('/api/meetups?postId=' + postId).then(function (data) {
        setAttendees(data);
      });
    },
    [postId],
  );

  if (attendees.length === 0) {
    return (
      <div className={styles.attendeeList}>
        <p className={styles.attendeeEmpty}>
          No one has joined yet. Be the first!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.attendeeList}>
      <h3 className={styles.attendeeTitle}>Who is going</h3>
      <ul className={styles.attendeeUl}>
        {attendees.map(function (attendee) {
          return (
            <li key={attendee._id} className={styles.attendeeItem}>
              {attendee.username}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
AttendeeList.propTypes = {
  postId: PropTypes.string,
};

export default AttendeeList;
