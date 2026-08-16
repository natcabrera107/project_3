import React from 'react';
import { post } from '../utils/api.js';
import styles from "./PostForm.module.css";
import PropTypes from 'prop-types';

function PostForm(props) {
  var [title, setTitle] = React.useState('');
  var [description, setDescription] = React.useState('');
  var [category, setCategory] = React.useState('');
  var [eventDate, setEventDate] = React.useState('');
  var [eventTime, setEventTime] = React.useState('');

  var [message, setMessage] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();

    var newPost = {
      title: title,
      description: description,
      category: category,
      eventDate: eventDate,
      eventTime: eventTime,
    };

    post('/api/posts', newPost).then(function (data) {
      setTitle('');
      setDescription('');
      setCategory('');
      setEventDate('');
      setEventTime('');

      setMessage('Post created!');

      if (props.onPostCreated) {
        props.onPostCreated(data);
      }
    });
  }

  return (
    <form className={styles.postForm} onSubmit={handleSubmit}>

    <h2>Create a Post</h2>

    <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={function (e) {
          setTitle(e.target.value);
        }}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={function (e) {
          setDescription(e.target.value);
        }}
        required
      />
      <label htmlFor="category">Category</label>
      <input
        type="text"
        id="category"
        value={category}
        onChange={function (e) {
          setCategory(e.target.value);
        }}
        required
      />

      <label htmlFor="eventDate">Date</label>
      <input
        type="date"
        id="eventDate"
        value={eventDate}
        onChange={function (e) {
          setEventDate(e.target.value);
        }}
        required
      />

      <label htmlFor="eventTime">Time</label>
      <input
        type="time"
        id="eventTime"
        value={eventTime}
        onChange={function (e) {
          setEventTime(e.target.value);
        }}
        required
      />
      
      {message !== '' && <p>{message}</p>}

      <button type="submit">Create Post</button>
    </form>
  );
}

PostForm.propTypes = {
  onPostCreated: PropTypes.func,
};

export default PostForm;
