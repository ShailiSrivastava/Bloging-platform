import Blog from '../models/Blog.js';
import User from '../models/User.js';

// Create blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, featuredImage, readTime, seoTitle, seoDescription, seoKeywords } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const blog = new Blog({
      title,
      content,
      excerpt: excerpt || content.substring(0, 500),
      category,
      tags: tags || [],
      featuredImage,
      readTime: readTime || 5,
      author: req.user._id,
      published: true,
      publishedAt: new Date(),
      seoTitle,
      seoDescription,
      seoKeywords
    });

    await blog.save();

    // Add blog to user's blogs
    const user = await User.findById(req.user._id);
    user.blogs.push(blog._id);
    await user.save();

    await blog.populate('author', 'name email avatar bio');

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all blogs with pagination and filtering
export const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, sort = '-createdAt' } = req.query;
    const skip = (page - 1) * limit;

    let filter = { published: true };

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    const blogs = await Blog.find(filter)
      .populate('author', 'name email avatar bio')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single blog
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name email avatar bio followers')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'name avatar email'
        }
      });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Increment views
    if (!blog.viewedBy.includes(req.user?._id)) {
      blog.views += 1;
      blog.viewedBy.push(req.user?._id);
      await blog.save();
    }

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get blog by slug
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true })
      .populate('author', 'name email avatar bio followers')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'name avatar email'
        }
      });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Increment views
    if (!blog.viewedBy.includes(req.user?._id)) {
      blog.views += 1;
      blog.viewedBy.push(req.user?._id);
      await blog.save();
    }

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Check if user is author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this blog'
      });
    }

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Check if user is author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this blog'
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    // Remove from user's blogs
    const user = await User.findById(req.user._id);
    user.blogs = user.blogs.filter(id => id.toString() !== blog._id.toString());
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Like blog
export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Check if already liked
    if (blog.likes.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: 'Already liked this blog'
      });
    }

    blog.likes.push(req.user._id);
    await blog.save();

    const user = await User.findById(req.user._id);
    user.likedBlogs.push(blog._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Blog liked successfully',
      likes: blog.likes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Unlike blog
export const unlikeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Check if liked
    if (!blog.likes.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: 'Blog not liked'
      });
    }

    blog.likes = blog.likes.filter(id => id.toString() !== req.user._id.toString());
    await blog.save();

    const user = await User.findById(req.user._id);
    user.likedBlogs = user.likedBlogs.filter(id => id.toString() !== blog._id.toString());
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Blog unliked successfully',
      likes: blog.likes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get trending blogs
export const getTrendingBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true })
      .sort('-views -likes')
      .limit(10)
      .populate('author', 'name avatar');

    res.status(200).json({
      success: true,
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get user blogs
export const getUserBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({ author: req.user._id })
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments({ author: req.user._id });

    res.status(200).json({
      success: true,
      data: blogs,
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
