import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false
    },
    avatar: {
      type: String,
      default: 'https://ui-avatars.com/api/?name=User&background=random'
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot be more than 500 characters']
    },
    socialLinks: {
      twitter: String,
      github: String,
      linkedin: String,
      website: String
    },
    followers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    following: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    blogs: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Blog'
      }
    ],
    likedBlogs: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Blog'
      }
    ],
    savedBlogs: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Blog'
      }
    ],
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    lastLogin: Date,
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const bcrypt = await import('bcryptjs');
    const salt = await bcrypt.default.genSalt(10);
    this.password = await bcrypt.default.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  const bcrypt = await import('bcryptjs');
  return await bcrypt.default.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
