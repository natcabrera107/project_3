import React from 'react';
import { get } from '../utils/api.js';
import './MyMeetups.css';

function MyMeetups() {
  var username = props.username;
  var [meetups, setMeetups] = React.useState([]);

  React.useEffect(function() {
    if (username === null || username === '') {
      return;
    }
    get('/api/meetups?username=' + username).then(function(data) {
      setMeetups(data);
    });
  }, [username]);

  if (username === null || username === '') {
    return (
      <div className="my-meetups">
        <p>Please log in to see your meetups.</p>
      </div>
    );
  }

  if (meetups.length === 0) {
    return (
      <div className="my-meetups">
        <p>You have not joined any meetups yet.</p>
      </div>
    );
  }

  return (
    <div className="my-meetups">
      <h2>My Meetups</h2>
      <ul className="meetups-list">
        {meetups.map(function(meetup) {
          return (
            <li key={meetup._id} className="meetup-item">
              <p className="meetup-post">Post: {meetup.postId}</p>
              <p className="meetup-date">Joined: {new Date(meetup.joinedAt).toLocaleDateString()}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MyMeetups;