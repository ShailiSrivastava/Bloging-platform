# HashBlog Full-Stack Setup Guide

## 🚀 Project Structure

```
blogging-platform/
├── frontend/
│   ├── index.html              # Home page
│   ├── index2.html             # Blog editor & feed
│   ├── login.html              # Login page
│   ├── register.html           # Registration page
│   ├── js/
│   │   └── api.js              # API client
│   └── ...
├── backend/
│   ├── server.js               # Main server file
│   ├── package.json            # Dependencies
│   ├── .env                    # Environment variables
│   ├── models/
│   │   ├── User.js
│   │   ├── Blog.js
│   │   └── Comment.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── blogController.js
│   │   └── commentController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── blogRoutes.js
│   │   └── commentRoutes.js
│   └── middleware/
│       ├── auth.js
│       └── errorHandler.js
└── README.md
```

## 📋 Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- Git
- npm or yarn

## 🔧 Installation & Setup

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd blogging-platform
```

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (already provided)
# Edit .env and update MongoDB URI if needed
```

#### .env Configuration
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/hashblog
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:3000
```

### Step 3: MongoDB Setup

#### Option A: Local MongoDB
```bash
# Windows
mongod

# macOS/Linux
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update MONGODB_URI in .env

### Step 4: Start Backend Server
```bash
cd backend
npm start
# Or for development with auto-reload:
npm run dev
```

Server runs on: `http://localhost:5000`

### Step 5: Frontend Setup

Copy the frontend files from `blogging/` to your static server or update FRONTEND_URL in backend .env.

The frontend files are already updated with API integration through `js/api.js`

## 🔐 Authentication Flow

### Register
```
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

### Login
```
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response includes JWT token stored in `authToken` localStorage

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `POST /api/auth/follow/:id` - Follow user (protected)
- `POST /api/auth/unfollow/:id` - Unfollow user (protected)
- `GET /api/auth/user/:id` - Get user profile

### Blogs
- `GET /api/blogs` - Get all blogs (with pagination, filtering)
- `POST /api/blogs` - Create blog (protected)
- `GET /api/blogs/trending` - Get trending blogs
- `GET /api/blogs/:id` - Get blog by ID
- `PUT /api/blogs/:id` - Update blog (protected, author only)
- `DELETE /api/blogs/:id` - Delete blog (protected, author only)
- `POST /api/blogs/:id/like` - Like blog (protected)
- `POST /api/blogs/:id/unlike` - Unlike blog (protected)

### Comments
- `GET /api/comments/:blogId` - Get blog comments
- `POST /api/comments/:blogId` - Create comment (protected)
- `PUT /api/comments/:commentId` - Update comment (protected)
- `DELETE /api/comments/:commentId` - Delete comment (protected)
- `POST /api/comments/:commentId/like` - Like comment (protected)
- `POST /api/comments/:commentId/unlike` - Unlike comment (protected)

## 🔄 Frontend API Usage

### Using the API Client

```javascript
import BlogAPI from './js/api.js';

// Register
const result = await BlogAPI.register(name, email, password, passwordConfirm);

// Login
const result = await BlogAPI.login(email, password);

// Create Blog
const blog = await BlogAPI.createBlog({
  title: 'My Blog',
  content: 'Blog content...',
  category: 'web',
  tags: ['javascript', 'react']
});

// Get All Blogs
const blogs = await BlogAPI.getAllBlogs(page, limit, category, search);

// Like Blog
const result = await BlogAPI.likeBlog(blogId);
```

## 🧪 Testing API

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@test.com",
    "password": "test123",
    "passwordConfirm": "test123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.com",
    "password": "test123"
  }'

# Create Blog (with token)
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "My First Blog",
    "content": "This is my blog content",
    "category": "web",
    "tags": ["javascript"]
  }'
```

### Using Postman
1. Import the API endpoints
2. Set `{{token}}` variable in Authorization header
3. Test each endpoint

## 📦 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String,
  bio: String,
  followers: [ObjectId],
  following: [ObjectId],
  blogs: [ObjectId],
  likedBlogs: [ObjectId],
  role: String (user/admin),
  createdAt: Date,
  updatedAt: Date
}
```

### Blog
```javascript
{
  title: String,
  slug: String (unique),
  content: String,
  author: ObjectId (User),
  category: String,
  tags: [String],
  views: Number,
  likes: [ObjectId (User)],
  comments: [ObjectId (Comment)],
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Comment
```javascript
{
  content: String,
  author: ObjectId (User),
  blog: ObjectId (Blog),
  parentComment: ObjectId (Comment),
  replies: [ObjectId (Comment)],
  likes: [ObjectId (User)],
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Backend Deployment Options

#### Heroku
```bash
# Install Heroku CLI
heroku login
heroku create your-app-name
git push heroku main
```

#### Railway
```bash
# Push to Railway
railway link
railway up
```

#### AWS EC2
```bash
# SSH into instance
ssh -i key.pem ubuntu@your-instance.com

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone <repo>
cd backend
npm install
npm start
```

### Frontend Deployment Options
- **Netlify**: Connect GitHub repo, auto-deploys
- **Vercel**: Git integration, optimal for Next.js
- **GitHub Pages**: Static hosting
- **Firebase Hosting**: Global CDN

## 🔒 Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS in production
- [ ] Set CORS origin to frontend domain
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Use strong password requirements
- [ ] Implement email verification
- [ ] Add CSRF protection
- [ ] Keep dependencies updated

## 📝 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Solution: Start MongoDB service or update MONGODB_URI

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
Solution: Update FRONTEND_URL in backend .env

### JWT Token Error
```
Not authorized to access this route
```
Solution: Check token is sent in Authorization header with "Bearer" prefix

### Port Already in Use
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)
- [JWT.io](https://jwt.io)
- [Mongoose Documentation](https://mongoosejs.com)
- [REST API Best Practices](https://restfulapi.net)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open Pull Request

## 📄 License

MIT License - Free for personal and commercial use

---

**HashBlog Full-Stack Platform - Built for Developers**
