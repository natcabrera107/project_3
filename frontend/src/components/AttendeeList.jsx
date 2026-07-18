import React from 'react';
import { get } from '../utils/api.js';
import './AttendeeList.css';
import PropTypes from 'prop-types';

function AttendeeList(props) {
  var postId = props.postId;
  var [attendees, setAttendees] = React.useState([]);

  React.useEffect(
    function () {
      if (postId === null || postId === "") {
        return;
      }
      get("/api/meetups?postId=" + postId).then(function (data) {
        setAttendees(data);
      });
    },
    [postId],
  );

  if (attendees.length === 0) {
    return (
      <div className="attendee-list">
        <p className="attendee-empty">No one has joined yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="attendee-list">
      <h3 className="attendee-title">Who is going</h3>
      <ul className="attendee-ul">
        {attendees.map(function (attendee) {
          return (
            <li key={attendee._id} className="attendee-item">
              {attendee.username}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
AttendeeList.propTypes = {
  propName: PropTypes.string,
};

export default AttendeeList;
