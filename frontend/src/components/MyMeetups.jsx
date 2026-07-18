import React from 'react';
import { get } from '../utils/api.js';
import './MyMeetups.css';

function MyMeetups(props) {
  var username = props.username;
  var [meetups, setMeetups] = React.useState([]);
  var [posts, setPosts] = React.useState({});

  React.useEffect(function() {
    if (username === null || username === '') {
      return;
    }
    get('/api/meetups?username=' + username).then(function(data) {
      setMeetups(data);
      for (var i = 0; i < data.length; i++) {
        var meetup = data[i];
        get('/api/posts/' + meetup.postId).then(function(postData) {
          setPosts(function(prev) {
            var updated = Object.assign({}, prev);
            updated[postData._id] = postData;
            return updated;
          });
        });
      }
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
              {posts[meetup.postId] && (
                <p className="meetup-title">{posts[meetup.postId].title}</p>
              )}
              {posts[meetup.postId] && (
                <p className="meetup-event-date">{posts[meetup.postId].eventDate} at {posts[meetup.postId].eventTime}</p>
              )}
              <p className="meetup-date">Joined: {new Date(meetup.joinedAt).toLocaleDateString()}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MyMeetups;