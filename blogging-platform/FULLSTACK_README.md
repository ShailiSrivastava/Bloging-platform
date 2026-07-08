# 🚀 HashBlog - Full Stack Blogging Platform

**A modern, production-ready blogging platform built with Node.js, Express, MongoDB, and vanilla JavaScript**

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node](https://img.shields.io/badge/Node-14+-green)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Backend Setup](#-backend-setup)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### User Management
- ✅ User registration and authentication with JWT
- ✅ Password hashing with bcryptjs
- ✅ User profiles with bio and social links
- ✅ Follow/Unfollow system
- ✅ User followers and following lists

### Blog Management
- ✅ Create, read, update, delete blogs
- ✅ Rich text editor with formatting support
- ✅ Blog categories and tags
- ✅ Auto-generated slugs for SEO
- ✅ Featured images support
- ✅ Read time calculation
- ✅ Published/Draft status
- ✅ View count tracking

### Social Features
- ✅ Like/Unlike blogs
- ✅ Nested comments with replies
- ✅ Comment likes
- ✅ Like/Unlike comments
- ✅ Share functionality
- ✅ Trending blogs

### Discovery & Search
- ✅ Full-text search
- ✅ Category filtering
- ✅ Tag-based filtering
- ✅ Pagination
- ✅ Sorting options
- ✅ Trending/Popular blogs

### UI/UX
- ✅ Smooth animations and transitions
- ✅ Dark mode support
- ✅ Fully responsive design
- ✅ Glassmorphism effects
- ✅ Modern gradient backgrounds
- ✅ Interactive hover effects

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Custom validators
- **CORS**: Enabled for frontend integration

### Frontend
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with animations
- **JavaScript**: Vanilla JS with ES6 modules
- **API Client**: Custom fetch-based BlogAPI class
- **Icons**: Font Awesome 6.4

### Tools & Services
- **Package Manager**: npm
- **Environment**: dotenv
- **Development**: nodemon
- **Database**: MongoDB (local or Atlas)

## 📁 Project Structure

```
blogging-platform/
│
├── backend/                          # Backend server
│   ├── server.js                     # Main server file
│   ├── package.json                  # Dependencies
│   ├── .env                          # Environment variables
│   ├── .gitignore                    # Git ignore rules
│   │
│   ├── models/                       # Database models
│   │   ├── User.js
│   │   ├── Blog.js
│   │   └── Comment.js
│   │
│   ├── controllers/                  # Business logic
│   │   ├── authController.js
│   │   ├── blogController.js
│   │   └── commentController.js
│   │
│   ├── routes/                       # API routes
│   │   ├── authRoutes.js
│   │   ├── blogRoutes.js
│   │   └── commentRoutes.js
│   │
│   └── middleware/                   # Custom middleware
│       ├── auth.js                   # JWT verification
│       └── errorHandler.js           # Error handling
│
├── blogging/                          # Frontend (Static)
│   ├── index.html                    # Home page
│   ├── index2.html                   # Blog editor & feed
│   ├── login.html                    # Login page
│   ├── register.html                 # Registration page
│   ├── js/
│   │   └── api.js                    # API client
│   ├── img/
│   │   └── img1.jpg                  # Sample image
│   └── ANIMATIONS.md
│
├── FULLSTACK_SETUP.md                # Full-stack setup guide
├── README.md                          # This file
└── .gitignore                         # Global git ignore
```

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ 
- MongoDB (local or Atlas)
- npm or yarn
- Git

### 5-Minute Setup

```bash
# 1. Clone repository
git clone <repo-url>
cd blogging-platform

# 2. Backend setup
cd backend
npm install

# 3. Create .env file (already exists, just update MongoDB URI)
# Update MONGODB_URI if needed

# 4. Start backend
npm start
# Server runs on http://localhost:5000

# 5. Open frontend
# In another terminal, open the frontend files
cd ../blogging
# Open index.html in browser or use a local server
```

## 🔧 Backend Setup

### Installation

```bash
cd backend
npm install
```

### Environment Variables

Create `.env` file (already provided):

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/hashblog
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Start Development Server

```bash
# With auto-reload (recommended)
npm run dev

# Standard start
npm start
```

Server runs on: `http://localhost:5000`

### MongoDB Setup

#### Local MongoDB
```bash
# Windows
mongod

# macOS/Linux
mongod
```

#### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update MONGODB_URI in `.env`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### Blog Endpoints

#### Get All Blogs
```http
GET /blogs?page=1&limit=10&category=web&search=javascript

Headers:
Authorization: Bearer {token}
```

#### Create Blog
```http
POST /blogs
Content-Type: application/json
Authorization: Bearer {token}

{
  "title": "My First Blog",
  "content": "Blog content here...",
  "excerpt": "Short excerpt...",
  "category": "web",
  "tags": ["javascript", "react"],
  "readTime": 5
}
```

#### Get Single Blog
```http
GET /blogs/{id}
Authorization: Bearer {token}
```

#### Update Blog
```http
PUT /blogs/{id}
Content-Type: application/json
Authorization: Bearer {token}

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

#### Delete Blog
```http
DELETE /blogs/{id}
Authorization: Bearer {token}
```

#### Like Blog
```http
POST /blogs/{id}/like
Authorization: Bearer {token}
```

#### Unlike Blog
```http
POST /blogs/{id}/unlike
Authorization: Bearer {token}
```

### Comment Endpoints

#### Get Comments
```http
GET /comments/{blogId}?page=1&limit=10
```

#### Create Comment
```http
POST /comments/{blogId}
Content-Type: application/json
Authorization: Bearer {token}

{
  "content": "Great post!",
  "parentComment": null
}
```

#### Update Comment
```http
PUT /comments/{commentId}
Content-Type: application/json
Authorization: Bearer {token}

{
  "content": "Updated comment"
}
```

#### Delete Comment
```http
DELETE /comments/{commentId}
Authorization: Bearer {token}
```

## 🔐 Frontend API Usage

### Using BlogAPI Class

```javascript
import BlogAPI from './js/api.js';

// Register
const result = await BlogAPI.register(name, email, password, passwordConfirm);

// Login
const result = await BlogAPI.login(email, password);

// Create blog
const blog = await BlogAPI.createBlog({
  title: 'My Blog',
  content: 'Content...',
  category: 'web',
  tags: ['javascript']
});

// Get blogs
const blogs = await BlogAPI.getAllBlogs(page, limit, category, search);

// Like blog
const result = await BlogAPI.likeBlog(blogId);

// Get comments
const comments = await BlogAPI.getComments(blogId);

// Create comment
const comment = await BlogAPI.createComment(blogId, content);
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

# Create Blog
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "My Blog",
    "content": "Content here",
    "category": "web"
  }'
```

### Using Postman
1. Download [Postman](https://www.postman.com/downloads/)
2. Import API collection
3. Set environment variables (token)
4. Test endpoints

## 🚀 Deployment

### Backend Deployment Options

#### Option 1: Railway
```bash
# Install Railway CLI
npm install -g railway

# Login
railway login

# Deploy
railway up
```

#### Option 2: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Deploy
git push heroku main
```

#### Option 3: AWS EC2
```bash
# SSH into instance
ssh -i key.pem ubuntu@your-instance.com

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repo
git clone <repo>
cd blogging-platform/backend

# Install & start
npm install
npm start
```

### Frontend Deployment

- **Netlify**: Drag & drop static files
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Free hosting
- **Firebase Hosting**: Fast CDN

## 🔒 Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS in production
- [ ] Set CORS origin to production domain
- [ ] Implement rate limiting
- [ ] Validate all inputs
- [ ] Use strong password requirements
- [ ] Add email verification
- [ ] Enable CSRF protection
- [ ] Regular security audits
- [ ] Keep dependencies updated

## 📝 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB service or check MONGODB_URI

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Update FRONTEND_URL in backend .env

### JWT Token Error
```
Not authorized to access this route
```
**Solution**: Ensure token is sent with "Bearer" prefix in Authorization header

### Port Already in Use
```bash
# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Open Pull Request

## 📖 Documentation

- [Backend Setup](./FULLSTACK_SETUP.md) - Detailed backend configuration
- [API Documentation](./FULLSTACK_SETUP.md#-api-endpoints) - Complete API reference
- [Frontend Animations](./blogging/ANIMATIONS.md) - Animation details
- [Features Guide](./blogging/FEATURES.md) - Feature documentation

## 🎓 Learning Resources

- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Docs](https://mongoosejs.com)
- [JWT.io](https://jwt.io)
- [REST API Best Practices](https://restfulapi.net)

## 📄 License

MIT License - Free for personal and commercial use

## 🙌 Credits

Built with ❤️ for developers who love to share knowledge.

## 📞 Support

- Create an issue on GitHub
- Check documentation files
- Review code comments

---

**HashBlog** - Where developers share their journey 🚀
