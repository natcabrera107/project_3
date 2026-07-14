import express from "express";
import { connectDB } from "./db/connection.js";

import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";
import meetupsRouter from "./routes/meetups.js"; 

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.use(postsRouter); 
app.use(commentsRouter);
app.use(meetupsRouter);

await connectDB();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});