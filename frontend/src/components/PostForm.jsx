import React from 'react';
import { post } from '../utils/api.js';
import './PostForm.css';
import PropTypes from 'prop-types';


function PostForm(props) {
  var [title, setTitle] = React.useState("");
  var [description, setDescription] = React.useState("");
  var [category, setCategory] = React.useState("");
  var [eventDate, setEventDate] = React.useState("");
  var [eventTime, setEventTime] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    var newPost = {
      title: title,
      description: description,
      category: category,
      eventDate: eventDate,
      eventTime: eventTime,
    };

    post("/api/posts", newPost).then(function (data) {
      setTitle("");
      setDescription("");
      setCategory("");
      setEventDate("");
      setEventTime("");

      if (props.onPostCreated) {
        props.onPostCreated(data);
      }
    });
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>New Post</h2>

      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={function (e) {
          setTitle(e.target.value);
        }}
        required
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={function (e) {
          setDescription(e.target.value);
        }}
        required
      />
      <label>Category</label>
      <input
        type="data"
        value={category}
        onChange={function (e) {
          setCategory(e.target.value);
        }}
        required
      />

        <label>Date</label>
        <input
            type="date"
            value={eventDate}
            onChange={function(e) {setEventDate(e.target.value); }}
            required
            />
        
        <label>Time</label>
        <input
            type="time"
            value={eventTime}
            onChange={function(e) { setEventTime(e.target.value); }}
            required
        />
        
        <button type="submit">Create Post</button>
        </form>
    );
} 

PostForm.PropTypes = {
    onPostCreated: PropTypes.func,
};

export default PostForm;
