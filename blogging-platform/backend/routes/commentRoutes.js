import express from 'express';
import {
  createComment,
  getBlogComments,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment
} from '../controllers/commentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/:blogId', getBlogComments);

// Protected routes
router.post('/:blogId', protect, createComment);
router.put('/:commentId', protect, updateComment);
router.delete('/:commentId', protect, deleteComment);
router.post('/:commentId/like', protect, likeComment);
router.post('/:commentId/unlike', protect, unlikeComment);

export default router;
