# 🚀 Quick Start Guide - HashBlog Full Stack

## What You Now Have

You now have a **complete full-stack blogging platform** with:

✅ **Backend API** (Node.js + Express + MongoDB)
✅ **Frontend** (HTML, CSS, Vanilla JavaScript)
✅ **Authentication** (JWT-based user management)
✅ **Real Database** (MongoDB with Mongoose)
✅ **Production-Ready Code**

---

## 🎯 Getting Started in 3 Steps

### Step 1: Setup Backend

```bash
# Open terminal in the backend folder
cd backend

# Install dependencies
npm install

# Start the server
npm start
# or with auto-reload:
npm run dev
```

✅ Backend running on: `http://localhost:5000`

### Step 2: Start MongoDB

**Option A - Local MongoDB:**
```bash
mongod
```

**Option B - MongoDB Atlas (Cloud):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update in `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hashblog
```

### Step 3: Open Frontend

Open any of these files in your browser:
- `blogging/index.html` - Home page
- `blogging/register.html` - Create account
- `blogging/login.html` - Login
- `blogging/index2.html` - Blog editor (after login)

Or use a local server:
```bash
# Python 3
python -m http.server 3000 --directory blogging

# Python 2
python -m SimpleHTTPServer 3000

# Node.js
npx http-server blogging -p 3000
```

Then visit: `http://localhost:3000`

---

## 📖 Usage

### 1. Register a New Account
1. Click **Sign Up** button on home page
2. Enter name, email, and password
3. Account created! 🎉

### 2. Create a Blog Post
1. Login with your credentials
2. Go to **Blog Editor** page
3. Fill in blog details
4. Write your content
5. Click **Publish Blog**

### 3. Discover Blogs
1. Search blogs in real-time
2. Filter by category
3. Like posts you enjoy
4. Comment on blogs
5. Follow other writers

---

## 🔗 API Endpoints

All endpoints require Bearer token in Authorization header (except public routes):

```javascript
// Example: Using the API
const token = localStorage.getItem('authToken');

fetch('http://localhost:5000/api/blogs', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/blogs` | Get all blogs |
| POST | `/api/blogs` | Create blog |
| POST | `/api/blogs/:id/like` | Like blog |
| POST | `/api/comments/:blogId` | Add comment |

See `FULLSTACK_SETUP.md` for complete API documentation.

---

## 🛠️ File Structure to Know

```
backend/
├── server.js                 # Main server file
├── package.json              # Dependencies list
├── .env                      # Configuration (edit MongoDB URI here)
├── models/                   # Database models (User, Blog, Comment)
├── controllers/              # Business logic
├── routes/                   # API routes
└── middleware/               # Auth & error handling

blogging/
├── index.html                # Home page
├── register.html             # Registration page
├── login.html                # Login page
├── index2.html               # Blog editor & feed
└── js/
    └── api.js                # API client (handles all API calls)
```

---

## 🔧 Environment Variables (.env)

The `.env` file is already created. Update if needed:

```env
# Server
PORT=5000                      # Server port
NODE_ENV=development           # Environment

# Database
MONGODB_URI=mongodb://localhost:27017/hashblog
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/hashblog

# Security
JWT_SECRET=your_secret_key_change_in_production
JWT_EXPIRE=7d                  # Token expiration

# Frontend
FRONTEND_URL=http://localhost:3000

# API
API_VERSION=v1
```

---

## 🧪 Test the API

### Using cURL

**Create Account:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@test.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.com",
    "password": "password123"
  }'
```

**Create Blog (use token from login response):**
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My First Blog",
    "content": "This is my blog content",
    "category": "web",
    "tags": ["javascript", "nodejs"]
  }'
```

---

## 🐛 Common Issues & Solutions

### ❌ "MongoDB connection error"
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Fix:** Start MongoDB with `mongod` command

### ❌ "Port 5000 already in use"
```bash
# Find process on port 5000
lsof -i :5000

# Kill it
kill -9 <PID>
```

### ❌ "CORS error"
```
Access to XMLHttpRequest blocked by CORS policy
```
**Fix:** Make sure FRONTEND_URL in `.env` is correct

### ❌ "Token invalid"
```
Not authorized to access this route
```
**Fix:** Ensure Authorization header has "Bearer " prefix

### ❌ "Can't find module 'express'"
```bash
# Reinstall dependencies
cd backend
npm install
```

---

## 📚 Next Steps

### For Development
1. Update MongoDB connection if using Atlas
2. Change JWT_SECRET in production
3. Customize brand colors in CSS
4. Add more features (email notifications, image uploads, etc.)

### For Deployment
1. Choose hosting (Railway, Heroku, AWS, etc.)
2. Set environment variables on hosting platform
3. Deploy backend
4. Deploy frontend
5. Update FRONTEND_URL

See `FULLSTACK_SETUP.md` for detailed deployment guide.

---

## 🎓 Learning Path

1. **Understand the Flow**
   - User registers → Token created → Can create blogs
   - Blogs stored in MongoDB → Retrieved via API
   - Frontend calls API using BlogAPI class

2. **Explore Code**
   - `backend/server.js` - Server setup
   - `backend/controllers/` - Business logic
   - `blogging/js/api.js` - Frontend API calls

3. **Modify Features**
   - Add new blog fields in `Blog.js` model
   - Create new API endpoints in `blogController.js`
   - Update frontend to use new features

4. **Deploy**
   - Follow deployment guide in `FULLSTACK_SETUP.md`
   - Test all features in production
   - Monitor performance

---

## 📞 Need Help?

1. **Check Documentation**
   - `FULLSTACK_README.md` - Overview
   - `FULLSTACK_SETUP.md` - Detailed setup
   - `blogging/FEATURES.md` - Feature list
   - `blogging/ANIMATIONS.md` - Animation reference

2. **Review Code**
   - Backend is well-commented
   - Frontend uses clear variable names
   - Models define database structure

3. **Test with Postman**
   - Download [Postman](https://www.postman.com)
   - Create requests for each API endpoint
   - Debug API issues

---

## ✨ Quick Reference Commands

```bash
# Backend setup
cd backend
npm install
npm start                    # Start server
npm run dev                  # Start with auto-reload

# Database
mongod                       # Start MongoDB locally

# Frontend
python -m http.server 3000  # Serve frontend files

# Testing
curl -X GET http://localhost:5000/api/health  # Check API health
```

---

## 🎉 You're Ready!

Your full-stack blogging platform is now set up and ready to use. 

### What to do next:
1. ✅ Start the backend server
2. ✅ Start MongoDB
3. ✅ Open the frontend
4. ✅ Create an account
5. ✅ Write your first blog!

**Happy Blogging! 🚀**

---

**Questions?** Check the detailed guides or review the source code - it's all well-documented!
