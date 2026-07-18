import express from "express";
import { getDB } from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// get all the posts
router.get("/api/posts", async (req, res) => {
  const db = getDB();
  const posts = await db.collection("posts").find().toArray();
  res.json(posts);
});

// get a single post by id
router.get("/api/posts/:id", async (req, res) => {
  const db = getDB();
  const post = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

// create a new post
router.post("/api/posts", async (req, res) => {
  const db = getDB();
  const { title, description, category, eventDate, eventTime } = req.body;
  const newPost = {
    title,
    description,
    category,
    eventDate,
    eventTime,
    createdAt: new Date(),
  };
  const result = await db.collection("posts").insertOne(newPost);
  res.status(201).json({ _id: result.insertedId, ...newPost });
});

// update a post
router.put("/api/posts/:id", async (req, res) => {
  const db = getDB();
  const { title, description, category, eventDate, eventTime } = req.body;
  await db
    .collection("posts")
    .updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { title, description, category, eventDate, eventTime } },
    );
  res.json({ message: "Post updated" });
});

// delete a post
router.delete("/api/posts/:id", async (req, res) => {
  const db = getDB();
  await db.collection("posts").deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ message: "Post deleted" });
});

export default router;
