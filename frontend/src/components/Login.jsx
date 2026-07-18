import React from 'react';
import { post } from '../utils/api.js';
import './Login.css';

function Login(props) {
  var [username, setUsername] = React.useState('');
  var [password, setPassword] = React.useState('');
  var [isSignup, setIsSignup] = React.useState(false);
  var [message, setMessage] = React.useState('');

  var modeText = 'Log In';
  var toggleText = 'Need an account?';
  var toggleBtnText = 'Sign Up';

  if (isSignup === true) {
    modeText = 'Sign Up';
    toggleText = 'Already have an account?';
    toggleBtnText = 'Log In';
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isSignup === true) {
      post('/api/auth/signup', { username: username, password: password }).then(function(data) {
        if (data.message === 'Username is already taken') {
          setMessage(data.message);
        }
        else {
          localStorage.setItem('username', username);
          if (props.onLogin) {
            props.onLogin(username);
          }
        }
      });
    }
    else {
      post('/api/auth/login', { username: username, password: password }).then(function(data) {
        if (data.message === 'Logged in') {
          localStorage.setItem('username', username);
          if (props.onLogin) {
            props.onLogin(username);
          }
        }
        else {
          setMessage('Invalid username or password.');
        }
      });
    }
  }

  function toggleMode() {
    if (isSignup === true) {
      setIsSignup(false);
    }
    else {
      setIsSignup(true);
    }
    setMessage('');
  }

  return (
    <div className="login">
      <h2>{modeText}</h2>

      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">Username</label>
        <input
          type="text"
          className="login-input"
          value={username}
          onChange={function(e) { setUsername(e.target.value); }}
          required
        />

        <label className="login-label">Password</label>
        <input
          type="password"
          className="login-input"
          value={password}
          onChange={function(e) { setPassword(e.target.value); }}
          required
        />

        <button type="submit" className="login-btn">
          {modeText}
        </button>
      </form>

      {message !== '' && (
        <p className="login-message">{message}</p>
      )}

      <p className="login-toggle">
        {toggleText}
        <button className="login-toggle-btn" onClick={toggleMode}>
          {toggleBtnText}
        </button>
      </p>
    </div>
  );
}

export default Login;