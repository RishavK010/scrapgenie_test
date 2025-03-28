import express from 'express';
import { getPosts, createPost, deletePost } from '../controllers/postController.js';

const router = express.Router();

router.route('/')
    .get(getPosts)
    .post(createPost);

router.route('/:id')
    .delete(deletePost);

export default router;