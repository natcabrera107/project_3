import express from "express"; 
import { getDB } from "../db.js";
import { ObjectId } from "mongodb"; 

const router = express.Router();

//get all comments 
router.get("/api/posts/:postId/comments", async (req, res) => {
    const db = getDB();
    const comments = await db.collection("comments").find({postId: req.params.postID}).toArray();
    res.json(comments);

}).                  

// create a new post comment 
router.post("/api/posts/:podtId/comments", async (req, res) => {
    const db = getDB();
    const { test, author } = req.body();
    const newComment = {
        postID: req.params.postId, 
        test, 
        author, 
        createdAt: new Date();
    };
    const result = await db.collection("comments").insertOne(newComment);
    res.status(201).json({_id: result.insertedId, ...newComment});
})

// deleting a comment 

router.delete("/api/comments/:id", async (req, res) => {
    const db = getDB();
    await db.collection("comments").deleteOne({_id: new ObjectId(req.params.id)});
    res.json({message: "comment deleted)};

})

export default router; 