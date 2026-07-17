import express from 'express';
import passport from 'passport';
import { getDB } from '../db/connection.js';

var router = express.Router();

// sign up a new user
router.post('/api/auth/signup', async function(req, res) {
  var db = getDB();
  var username = req.body.username;
  var password = req.body.password;

  // check if username already exists
  var existingUser = await db.collection('users').findOne({ username: username });

  if (existingUser !== null) {
    res.json({ message: 'Username is already taken' });
    return;
  }

  // create new user
  var newUser = {
    username: username,
    password: password
  };

  var result = await db.collection('users').insertOne(newUser);

  res.json({ _id: result.insertedId, username: username });
});

// log in an existing user
router.post('/api/auth/login', passport.authenticate('local', {
  failureMessage: true
}), function(req, res) {
  res.json({ message: 'Logged in', username: req.user.username });
});

// log out
router.post('/api/auth/logout', function(req, res) {
  req.logout(function() {
    res.json({ message: 'Logged out' });
  });
});

// check if user is currently logged in
router.get('/api/auth/me', function(req, res) {
  if (req.user) {
    res.json({ username: req.user.username });
  } else {
    res.json({ username: null });
  }
});

export default router;