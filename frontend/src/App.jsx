import React from 'react';
import Board from './components/Board.jsx';
import PostForm from './components/PostForm.jsx';
import PostDetail from './components/PostDetail.jsx';
import Login from './components/Login.jsx';
import MyMeetups from './components/MyMeetups.jsx';
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
        <button
          onClick={function () {
            setView('board');
          }}
        >
          Board
        </button>
        <button
          onClick={function () {
            setView('newpost');
          }}
        >
          New Post
        </button>
        <button
          onClick={function () {
            setView('meetups');
          }}
        >
          My Meetups
        </button>
        <button
          onClick={function () {
            setView('login');
          }}
        >
          Login
        </button>
      </nav>

      {/* Authentication feedback is missing. After logging in, there is no success message or indication that the user is authenticated (e.g., displaying the username). Adding a login success alert/toast and a visible Logout button would significantly improve the user experience and make the authentication state clear. */}

      {view == 'board' && <Board onSelectPost={goToPost} />}
      {view == 'newpost' && <PostForm />}
      {view == 'detail' && (
        <PostDetail postId={selectedPostId} username={currentUser} />
      )}
      {view == 'meetups' && <MyMeetups username={currentUser} />}
      {view == 'login' && <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
