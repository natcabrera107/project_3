import React from 'react'; 
import { get, post } from '../utils/api.js';
import IAmIn from './IAmIn.jsx';
import AttendeeList from './AttendeeList.jsx';
import './PostDetail.css';

function PostDetail(props) {
    var postId = props.postId;
    var [postData, setPostData] = React.useState(null);
    var [comments, setComments] = React.useState([]);
    var [commentText, setCommentText] = React.useState('');

    React.useEffect(function() {
        if (!postId) return; 

        get('/api/posts/' + postId).then(function(data) {
            setPostData(data);
        });

        get('/api/posts/' + postId + '/comments').then(function(data) {
            setComments(data);
        });

    }, [postId]);

    function handleCommentSubmit(e) {
        e.preventDefault(); 
        var username = localStorage.getItem('username');

        post('/api/posts/' + postId + '/comments', {
            text: commentText, 
            author: username
        }).then(function(newComment) {
            setComments(comments.concat([newComment]));
            setCommentText('');
        });
    }
    if (!postData) {
        return <p>Loading..</p>
    }

    return (
        <div className="post-detail">
            <h2>{postData.title}</h2>
            <p>{postData.category}</p>
            <p>{postData.description}</p>

            <IAmIn postId={postId} username={props.username} />
            <AttendeeList postId={postId} /> 

            <h3>Comments</h3>
            <ul className="comment-list">
                {comments.map(function(comment){
                    return (
                        <li key={comment._id} className="comment-item">
                            <strong>{comment.author}</strong>: {comment.text}
                        </li>
                    );
                })}
            </ul>

            <form onSubmit={handleCommentSubmit} className="comment-form">
                <input
                    type="text"
                    value={commentText}
                    onChange={function(e) { setCommentText(e.target.value); }}
                    placeholder="Add a comment..."
                    required
                />
                <button type="submit">Post</button> 
            </form>
        </div>
    );
}

export default PostDetail; 