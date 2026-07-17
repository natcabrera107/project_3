import express from "express";
import { connectDB } from "./db/connection.js";

import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";
import meetupsRouter from "./routes/meetups.js"; 

import session from 'express-session';
import passport from 'passport';
import './auth/passportConfig.js';
import authRouter from './routes/auth.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.static(join(__dirname, '../frontend/dist')));

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