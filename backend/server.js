import express from "express";
import { connectDB } from "./db/connection.js";

import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";
import meetupsRouter from "./routes/meetups.js"; 

import session from 'express-session';
import passport from 'passport';
import './auth/passportConfig.js';
import authRouter from './routes/auth.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// session setup
app.use(session({
  secret: 'orbit2026',
  resave: false,
  saveUninitialized: false
}));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

app.use(postsRouter); 
app.use(commentsRouter);
app.use(meetupsRouter);
app.use(authRouter);

await connectDB();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});