import React from 'react';
import { post } from '../utils/api.js';
import './PostForm.css';

function PostForm(props) {
    var [title, setTitle] = react.useState('');
    var [description, setDescription] = React.useSatate('');
    var [category, setCategory] = React.useState('');
    var [eventDate, setEventDate] = React.useState('');
    var [eventTime, setEventTime] = React.useState('');

    function handleSubmit(e) {
        e.preventdefault();


    var newPost = {
        title: title, 
        decription: description, 
        categgory: category, 
        eventDate: eventDate, 
        eventTime: eventTime
    };

    post('/api/posts', newPost).then(function(data) {
        setTitle('');
        setDescription('');
        setCategory('');
        setEventDate('');
        setEventTime('');
    
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
            onChange={function(e) { setTitle(e.target.value); }}
            required 
        />

        <label>Description</label>
        <textarea
            value={description}
            onChange={function(e) { setDescription(e.target.value); }}
            required
        />
        <label>Category</label>
        <input 
            type="data"
            value={category}
            onChange={function(e) {setCategory(e.target.value); }}
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

export default PostForm; 
