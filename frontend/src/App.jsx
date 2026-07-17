import React from 'react';
import Board from './components/Board.js';
import PostForm from './components/PostForm.js';
import PostDetail from './components/PostDetail.js';
import Login from './components/Login.js';
import MyMeetups from './components/MyMeetups.js';
import { get } from './utils/api.js';
import './App.css';

function App() {
  var [view, setView] = React.useState('board');
  var [selectedPostId, setSelectedPostId] = React.useState('');
  var [currentUser, setCurrentUser] = React.useState('');

  function goToPost(postId) {
    setSelectedPostId(postId);
    setView('detail');
  }

  function handleLogin(username) {
    setCurrentUser(username);
    setView('board');
  }

  return (
    <div className="app">
      <nav className="navbar">
        <button onClick={function() {setView('board');}}>Board</button>
        <button onClick={function() {setView('newpost');}}>New Post</button>
        <button onClick={function() {setView('meetups');}}>My Meetups</button>
        <button onClick={function() {setView('login');}}>Login</button>
      </nav>

      {view == 'board' && <Board onSelectPost={goToPost} />}
      {view == 'newpost' && <PostForm />}
      {view == 'detail' && <PostDetail postId={selectedPostId} username={currentUser} />}
      {view == 'meetups' && <MyMeetups username={currentUser} />}
      {view == 'login' && <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;