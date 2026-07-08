import Comment from '../models/Comment.js';
import Blog from '../models/Blog.js';

// Create comment
export const createComment = async (req, res) => {
  try {
    const { content, parentComment } = req.body;
    const { blogId } = req.params;

    // Validation
    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Comment content is required'
      });
    }

    // Check if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    const comment = new Comment({
      content,
      author: req.user._id,
      blog: blogId,
      parentComment: parentComment || null
    });

    await comment.save();

    // Add comment to blog
    blog.comments.push(comment._id);
    await blog.save();

    // If reply, add to parent comment
    if (parentComment) {
      const parentCommentDoc = await Comment.findById(parentComment);
      parentCommentDoc.replies.push(comment._id);
      await parentCommentDoc.save();
    }

    await comment.populate('author', 'name avatar email');

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get blog comments
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const comments = await Comment.find({
      blog: blogId,
      parentComment: null,
      isDeleted: false
    })
      .populate('author', 'name avatar email')
      .populate({
        path: 'replies',
        populate: {
          path: 'author',
          select: 'name avatar email'
        }
      })
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Comment.countDocuments({
      blog: blogId,
      parentComment: null,
      isDeleted: false
    });

    res.status(200).json({
      success: true,
      data: comments,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update comment
export const updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { commentId } = req.params;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Comment content is required'
      });
    }

    let comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check if user is author
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this comment'
      });
    }

    comment = await Comment.findByIdAndUpdate(
      commentId,
      { content, isEdited: true, editedAt: new Date() },
      { new: true }
    ).populate('author', 'name avatar email');

    res.status(200).json({
      success: true,
      message: 'Comment updated successfully',
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check if user is author or admin
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment'
      });
    }

    comment.isDeleted = true;
    await comment.save();

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Like comment
export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    if (comment.likes.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: 'Already liked this comment'
      });
    }

    comment.likes.push(req.user._id);
    await comment.save();

    res.status(200).json({
      success: true,
      message: 'Comment liked successfully',
      likes: comment.likes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Unlike comment
export const unlikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    if (!comment.likes.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: 'Comment not liked'
      });
    }

    comment.likes = comment.likes.filter(id => id.toString() !== req.user._id.toString());
    await comment.save();

    res.status(200).json({
      success: true,
      message: 'Comment unliked successfully',
      likes: comment.likes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
