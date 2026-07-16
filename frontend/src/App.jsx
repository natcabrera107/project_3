import React from 'react';
import Board from '/components/Board.js';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import Login from './components/Login';
import MyMeetups from './components/MyMeetups';
import './App.css'; 

function App() {
  var [view, setView] = React.useState('board');
  var [selectedPostId, setSelectedPostId] = React.useState('');

  function goToPost(postId) {
    setSelectedPostId(postId);
    setView('detail');
  }

  return (
    <div className="app">
      <nav className="navbar">
        <button onClick={function() {setView('board'); }}>Board</button>
        <button onClick={function() {setView('newpost');}}>New Post</button>
        <button onClick={function() {setView('meetups');}}>My Meetups</button>
        <button onClick={function() {setView('login')}}>Login</button>
      </nav>

      {view == 'board' && <Board onselectPost={goToPost} />}
      {view == 'newpost' && <PostForm /> }
      {view == 'detail' && <PostDetail postId={selectedPostId} />}
      {view == 'meetups' && <MyMeetups /> }
      {view == 'login' && <Login /> }
    </div>
  );
}

export default App; 