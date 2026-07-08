import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please provide comment content'],
      maxlength: [1000, 'Comment cannot be more than 1000 characters']
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    blog: {
      type: mongoose.Schema.ObjectId,
      ref: 'Blog',
      required: true
    },
    parentComment: {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
      default: null
    },
    replies: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
      }
    ],
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    isEdited: {
      type: Boolean,
      default: false
    },
    editedAt: Date,
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Auto-populate author
commentSchema.pre(/^find/, function(next) {
  if (this.options._recursed) return next();
  this.populate({
    path: 'author',
    select: 'name email avatar'
  });
  next();
});

export default mongoose.model('Comment', commentSchema);
