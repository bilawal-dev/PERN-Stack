import { Router } from "express";
import { getAllPosts, getPost, createPost, updatePost, deletePost } from "../controllers/postController.js";

const router = Router();

router.get('/', getAllPosts);

router.post('/', createPost);

router.get('/:id', getPost);

router.patch('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;
