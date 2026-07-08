import express from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  likeBlog,
  unlikeBlog,
  getTrendingBlogs,
  getUserBlogs
} from '../controllers/blogController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/trending', getTrendingBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', getBlogById);

// Protected routes
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);
router.post('/:id/like', protect, likeBlog);
router.post('/:id/unlike', protect, unlikeBlog);
router.get('/user/my-blogs', protect, getUserBlogs);

export default router;
