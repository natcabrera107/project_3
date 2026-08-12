import React from 'react';
import { get } from '../utils/api.js';
import styles from './Board.module.css';
import PropTypes from 'prop-types';

function Board(props) {
  var [posts, setPosts] = React.useState([]);

  React.useEffect(function () {
    get('/api/posts').then(function (data) {
      setPosts(data);
    });
  }, []);

  return (
    <div className={styles.board}>
      <h2>Orbit Board</h2>
      {posts.map(function (post) {
        return (
          <button
            key={post._id}
            className={styles.postCard}
            onClick={function () {
              props.onSelectPost(post._id);
            }}
          >
            <h3>{post.title}</h3>
            <p>
              {post.category} - {post.eventDate} at {post.eventTime}
            </p>
          </button>
        );
      })}
    </div>
  );
}

Board.propTypes = {
  onSelectPost: PropTypes.func.isRequired,
};

export default Board;