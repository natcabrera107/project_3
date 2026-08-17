import React from 'react';
import { post } from '../utils/api.js';
import styles from './Login.module.css';
import PropTypes from 'prop-types';

function Login(props) {
  var [username, setUsername] = React.useState('');
  var [password, setPassword] = React.useState('');
  var [isSignup, setIsSignup] = React.useState(false);
  var [message, setMessage] = React.useState('');

  var [showContinue, setShowContinue] = React.useState(false);

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
      post('/api/auth/signup', { username: username, password: password }).then(
        function (data) {
          if (data.message === 'Username is already taken') {
            setMessage(data.message);
          } else {
            localStorage.setItem('username', username);
            setMessage('Account created!');
            setShowContinue(true);
          }
        },
      );
    } else {
      post('/api/auth/login', { username: username, password: password }).then(
        function (data) {
          if (data.message === 'Logged in') {
            localStorage.setItem('username', username);
            setMessage('Logged in successfully!');
            setShowContinue(true);
          } else {
            setMessage('Invalid username or password.');
          }
        },
      );
    }
  }

  function toggleMode() {
    if (isSignup === true) {
      setIsSignup(false);
    } else {
      setIsSignup(true);
    }
    setMessage('');
  }

  return (
    <div className={styles.login}>
      <h2>{modeText}</h2>

      {showContinue === false && (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <label className={styles.loginLabel} htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className={styles.loginInput}
            value={username}
            onChange={function (e) {
              setUsername(e.target.value);
            }}
            required
          />

          <label className={styles.loginLabel} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={styles.loginInput}
            value={password}
            onChange={function (e) {
              setPassword(e.target.value);
            }}
            required
          />

          <button type="submit" className={styles.loginBtn}>
            {modeText}
          </button>
        </form>
      )}

      {message !== '' && <p className={styles.loginMessage}>{message}</p>}
      {showContinue === true && (
        <button
          className={styles.loginBtn}
          onClick={function () {
            if (props.onLogin) {
              props.onLogin(username);
            }
          }}
        >
          Continue
        </button>
      )}

      <p className={styles.loginToggle}>
        {toggleText}
        <button className={styles.loginToggleBtn} onClick={toggleMode}>
          {toggleBtnText}
        </button>
      </p>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func,
};

export default Login;
