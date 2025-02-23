import express from 'express';
import Comment from '../models/comment.js';

const router = express.Router();

// POST route to create a new comment
router.post('/', async (req, res) => {
    try {
        console.log("Received Data:", req.body);  // Debug log
        const { description, response } = req.body;
        //console.log("Received Data:", req.body);
        if (!description) {
            return res.status(400).json({ error: "Description is required!" });
        }

        const newComment = new Comment({ description, response });
        await newComment.save();
        console.log("Comment Saved:", newComment);  // Debug log
        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error in POST /comments:", error);
        res.status(500).json({ error: error.message });
    }
});



router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


const commentRouter = router;
export default commentRouter;