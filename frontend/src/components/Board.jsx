import React from "react";
import { get } from '../utils/api.js';
import './Board.css';
import PropTypes from 'prop-types';


function Board(props) {
  var [posts, setPosts] = React.useState([]);

  React.useEffect(function () {
    get("/api/posts").then(function (data) {
      setPosts(data);
    });
  }, []);

  return (
    <div className="board">
      <h2>Orbit Board</h2>
      {posts.map(function (post) {
        return (
          <div
            key={post._id}
            className="post-card"
            onClick={function () {
              props.onSelectPost(post._id);
            }}
          >
            <h3>{post.title}</h3>
            <p>
              {post.category} - {post.eventDate} at {post.eventTime}
            </p>
          </div>
        );
      })}
    </div>
  );
}

Board.propTypes = {
    onSelectPost: PropTypes.func.isRequired,
};

export default Board;
