import express from 'express';
import { getDB } from '../db/connection.js';
import { ObjectId } from 'mongodb';

var router = express.Router();

// attendee list on post page and My Meetups page
router.get('/api/meetups', async function(req, res) {
  var db = getDB();
  var postId = req.query.postId;
  var username = req.query.username;
  var filter = {};

  if (postId) {
    filter = { postId: postId };
  } else if (username) {
    filter = { username: username };
  }

  var meetups = await db.collection('meetups').find(filter).toArray();
  res.json(meetups);
});

// I'm in button
router.post('/api/meetups', async function(req, res) {
  var db = getDB();
  var postId = req.body.postId;
  var username = req.body.username;

  var existing = await db.collection('meetups').findOne({ postId: postId, username: username });

  if (existing) {
    res.json({ message: 'Already joined', meetup: existing });
    return;
  }

  var newMeetup = {
    postId: postId,
    username: username,
    joinedAt: new Date()
  };

  var result = await db.collection('meetups').insertOne(newMeetup);

  var createdMeetup = {
    _id: result.insertedId,
    postId: postId,
    username: username,
    joinedAt: newMeetup.joinedAt
  };

  res.json(createdMeetup);
});

// leave a meetup
router.delete('/api/meetups/:id', async function(req, res) {
  var db = getDB();
  var id = req.params.id;
  await db.collection('meetups').deleteOne({ _id: new ObjectId(id) });
  res.json({ message: 'Left meetup' });
});

export default router;