import express from "express";
import { getDB } from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// get all comments for a post
router.get("/api/posts/:postId/comments", async (req, res) => {
  const db = getDB();
  const comments = await db
    .collection("comments")
    .find({ postId: req.params.postId })
    .toArray();
  res.json(comments);
});

// create a new comment on a post
router.post("/api/posts/:postId/comments", async (req, res) => {
  const db = getDB();
  const { text, author } = req.body;
  const newComment = {
    postId: req.params.postId,
    text,
    author,
    createdAt: new Date(),
  };
  const result = await db.collection("comments").insertOne(newComment);
  res.status(201).json({ _id: result.insertedId, ...newComment });
});

// deleting a comment
router.delete("/api/comments/:id", async (req, res) => {
  const db = getDB();
  await db
    .collection("comments")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ message: "Comment deleted" });
});

export default router;
