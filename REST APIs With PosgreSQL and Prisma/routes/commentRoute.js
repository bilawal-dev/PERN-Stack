import { Router } from "express";
import { getPostComments, createPostComment, updateComment, deleteComment } from "../controllers/commentController.js";

const router = Router();

// Get all comments for a specific post
router.get('/:postId', getPostComments);

// Create a new comment for a specific post
router.post('/:postId', createPostComment);

// Update a comment by ID
router.patch('/:commentId', updateComment);

// Delete a comment by ID
router.delete('/:commentId', deleteComment);

export default router;