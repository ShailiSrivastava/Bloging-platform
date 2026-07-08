import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a blog title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters']
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    content: {
      type: String,
      required: [true, 'Please provide blog content']
    },
    excerpt: {
      type: String,
      maxlength: [500, 'Excerpt cannot be more than 500 characters']
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: String,
      enum: ['web', 'mobile', 'ai', 'devops', 'career', 'database', 'cloud', 'other'],
      default: 'other'
    },
    tags: [String],
    featuredImage: {
      type: String,
      default: null
    },
    readTime: {
      type: Number,
      default: 5
    },
    views: {
      type: Number,
      default: 0
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
      }
    ],
    published: {
      type: Boolean,
      default: false
    },
    publishedAt: Date,
    seoTitle: String,
    seoDescription: String,
    seoKeywords: [String],
    viewedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
);

// Create slug from title
blogSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  this.slug = this.title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  next();
});

// Auto-populate author
blogSchema.pre(/^find/, function(next) {
  if (this.options._recursed) return next();
  this.populate({
    path: 'author',
    select: 'name email avatar bio'
  });
  next();
});

export default mongoose.model('Blog', blogSchema);
