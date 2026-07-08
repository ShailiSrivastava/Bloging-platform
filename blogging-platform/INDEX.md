# 📖 HashBlog Full-Stack Project - Complete Documentation Index

Welcome to **HashBlog**, a production-ready full-stack blogging platform! This document guides you through all available resources.

---

## 🎯 Start Here

**New to the project?** Read in this order:

1. **[QUICKSTART.md](./QUICKSTART.md)** ⭐ START HERE
   - 3-step setup guide
   - Common issues & solutions
   - Quick reference commands
   - ~5 minutes to get running

2. **[FULLSTACK_README.md](./FULLSTACK_README.md)**
   - Project overview
   - Tech stack explanation
   - Key features summary
   - Deployment options

3. **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)**
   - Architecture deep dive
   - Data flow diagrams
   - Database schemas
   - Technology decisions

4. **[FULLSTACK_SETUP.md](./FULLSTACK_SETUP.md)**
   - Detailed setup instructions
   - Environment configuration
   - API endpoint reference
   - Troubleshooting guide

---

## 📁 Project Structure

```
blogging-platform/
│
├── 📄 QUICKSTART.md              ← Read this first!
├── 📄 FULLSTACK_README.md        ← Main documentation
├── 📄 FULLSTACK_SETUP.md         ← Detailed setup
├── 📄 PROJECT_OVERVIEW.md        ← Architecture deep dive
├── 📄 INDEX.md                   ← This file
│
├── backend/                       ← Node.js + Express + MongoDB
│   ├── server.js                  # Main server file
│   ├── package.json               # Dependencies
│   ├── .env                       # Configuration
│   ├── models/                    # Database schemas
│   ├── controllers/               # Business logic
│   ├── routes/                    # API endpoints
│   └── middleware/                # Authentication & errors
│
└── blogging/                      ← Frontend (HTML/CSS/JS)
    ├── index.html                 # Home page
    ├── index2.html                # Blog editor & feed
    ├── login.html                 # Login page
    ├── register.html              # Registration page
    ├── js/api.js                  # API client
    ├── FEATURES.md                # Feature documentation
    ├── ANIMATIONS.md              # Animation reference
    ├── SETUP.md                   # Frontend setup
    └── README.md                  # Frontend guide
```

---

## 🚀 Quick Setup (5 Minutes)

### Terminal 1: Start Backend
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

### Terminal 2: Start MongoDB
```bash
mongod
# Or use MongoDB Atlas (cloud)
```

### Terminal 3: Serve Frontend
```bash
python -m http.server 3000 --directory blogging
# Or open blogging/index.html directly
```

### Access Application
- Home: `http://localhost:3000/index.html`
- Register: `http://localhost:3000/register.html`
- Login: `http://localhost:3000/login.html`
- Blog Editor: `http://localhost:3000/index2.html`

---

## 📚 Documentation Files

### Getting Started
| File | Purpose | Read Time |
|------|---------|-----------|
| **QUICKSTART.md** | 3-step setup & common issues | 5 min |
| **FULLSTACK_README.md** | Project overview & features | 10 min |
| **PROJECT_OVERVIEW.md** | Architecture & data flow | 15 min |

### Setup & Configuration
| File | Purpose | Read Time |
|------|---------|-----------|
| **FULLSTACK_SETUP.md** | Detailed setup guide | 20 min |
| **backend/.env** | Environment variables | 2 min |

### Frontend Documentation
| File | Purpose | Read Time |
|------|---------|-----------|
| **blogging/FEATURES.md** | Feature list & details | 10 min |
| **blogging/ANIMATIONS.md** | Animation reference | 10 min |
| **blogging/SETUP.md** | Frontend customization | 10 min |
| **blogging/README.md** | Frontend guide | 10 min |

### API Reference
See **FULLSTACK_SETUP.md** for:
- Authentication endpoints
- Blog management endpoints
- Comment system endpoints
- User management endpoints

---

## 🎯 What to Do Now

### Option 1: Just Want to Use It?
1. Follow [QUICKSTART.md](./QUICKSTART.md)
2. Register an account
3. Create your first blog post
4. Start exploring!

### Option 2: Want to Learn?
1. Read [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
2. Explore source code:
   - `backend/server.js` - Server setup
   - `backend/models/Blog.js` - Blog schema
   - `blogging/js/api.js` - API client
3. Review database queries in controllers
4. Understand authentication flow

### Option 3: Want to Modify?
1. Understand architecture from [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
2. Make backend changes:
   - Models: `backend/models/`
   - Logic: `backend/controllers/`
   - Routes: `backend/routes/`
3. Update frontend if needed:
   - UI: `blogging/index2.html`
   - Styles: CSS in HTML files
   - API calls: `blogging/js/api.js`
4. Test changes

### Option 4: Want to Deploy?
1. Choose hosting (Railway, Heroku, AWS, etc.)
2. Follow deployment section in [FULLSTACK_SETUP.md](./FULLSTACK_SETUP.md)
3. Set environment variables
4. Deploy backend and frontend
5. Update API URLs

---

## 🔍 Finding What You Need

### "I want to..."

**Create a new API endpoint**
- Read: `PROJECT_OVERVIEW.md` > Architecture section
- Example: `backend/routes/blogRoutes.js`
- Add route → Add controller function → Add response

**Add a new database field**
- Edit: `backend/models/Blog.js` or `User.js`
- Update: Controller to handle new field
- Test: Create/update via API

**Modify the homepage**
- Edit: `blogging/index.html`
- CSS: Look for `<style>` tags
- Update: Navigation, content, links

**Change colors/theme**
- Edit: `:root` variables in HTML files
- Files: All `*.html` files in `blogging/`
- Search: `#ff80ab` (primary color)

**Add authentication to a page**
- Check: `login.html` and `register.html` for pattern
- Copy: JavaScript from auth pages
- Add: Bearer token in API calls (see `js/api.js`)

**Debug an issue**
- Check: Browser console (F12)
- Check: Backend logs (terminal)
- Read: "Troubleshooting" section in [FULLSTACK_SETUP.md](./FULLSTACK_SETUP.md)

**Understand how something works**
- Search: Specific feature in docs
- Read: Related code file
- Check: Comments in source code

---

## 📊 File Map

### Backend Files (What Does What)

| File | Contains | Key Exports |
|------|----------|-------------|
| `server.js` | Server setup, routes, DB connection | Express app |
| `models/User.js` | User schema, password hashing | User model |
| `models/Blog.js` | Blog schema, slug generation | Blog model |
| `models/Comment.js` | Comment schema, relationships | Comment model |
| `controllers/authController.js` | Register, login, follow logic | 7 functions |
| `controllers/blogController.js` | Blog CRUD, like, search | 9 functions |
| `controllers/commentController.js` | Comment CRUD, replies, likes | 6 functions |
| `middleware/auth.js` | JWT verification | protect, authorize |
| `middleware/errorHandler.js` | Error handling, async wrapper | errorHandler |
| `routes/authRoutes.js` | Auth endpoint definitions | Express router |
| `routes/blogRoutes.js` | Blog endpoint definitions | Express router |
| `routes/commentRoutes.js` | Comment endpoint definitions | Express router |
| `package.json` | Dependencies, scripts | npm config |
| `.env` | Environment variables | Configuration |

### Frontend Files (What Does What)

| File | Purpose | Key Elements |
|------|---------|--------------|
| `index.html` | Home page, hero, blogs grid | Navigation, CTA, footer |
| `index2.html` | Blog editor, feed, sidebar | Form, blog cards, stats |
| `login.html` | User login form | Form, API call |
| `register.html` | User registration form | Form, API call |
| `js/api.js` | API client for all requests | BlogAPI class |

---

## 🔗 API Quick Reference

### User Routes
```
POST   /api/auth/register           Create account
POST   /api/auth/login              Login
GET    /api/auth/me                 Get current user
GET    /api/auth/user/:id           Get user profile
PUT    /api/auth/profile            Update profile
POST   /api/auth/follow/:id         Follow user
POST   /api/auth/unfollow/:id       Unfollow user
```

### Blog Routes
```
GET    /api/blogs                   Get all blogs
POST   /api/blogs                   Create blog
GET    /api/blogs/trending          Get trending
GET    /api/blogs/:id               Get blog
PUT    /api/blogs/:id               Update blog
DELETE /api/blogs/:id               Delete blog
POST   /api/blogs/:id/like          Like blog
POST   /api/blogs/:id/unlike        Unlike blog
```

### Comment Routes
```
GET    /api/comments/:blogId        Get comments
POST   /api/comments/:blogId        Create comment
PUT    /api/comments/:commentId     Update comment
DELETE /api/comments/:commentId     Delete comment
POST   /api/comments/:commentId/like     Like comment
POST   /api/comments/:commentId/unlike   Unlike comment
```

See [FULLSTACK_SETUP.md](./FULLSTACK_SETUP.md) for request/response examples.

---

## 🚨 Common Tasks

### Start Development
```bash
# Terminal 1
cd backend && npm install && npm start

# Terminal 2
mongod

# Terminal 3
cd blogging && python -m http.server 3000
```

### Test API with cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123","passwordConfirm":"pass123"}'

# See more examples in FULLSTACK_SETUP.md
```

### Add New Blog Field
1. Edit `backend/models/Blog.js` - Add field to schema
2. Edit `backend/controllers/blogController.js` - Handle in create/update
3. Edit `blogging/index2.html` - Add form input
4. Edit `blogging/js/api.js` - Include in API call

### Deploy to Production
1. Read "Deployment" section in [FULLSTACK_SETUP.md](./FULLSTACK_SETUP.md)
2. Choose hosting platform
3. Set environment variables
4. Deploy!

### Debug Issues
1. Check browser console (F12)
2. Check backend terminal
3. Search in [FULLSTACK_SETUP.md](./FULLSTACK_SETUP.md) troubleshooting
4. Add `console.log()` statements
5. Check network tab in DevTools

---

## 💡 Pro Tips

1. **Always check `/api/health` endpoint to verify backend is running**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Keep authToken in localStorage for authentication**
   ```javascript
   localStorage.getItem('authToken')
   localStorage.setItem('authToken', token)
   ```

3. **Update FRONTEND_URL in .env if frontend is on different port**
   ```env
   FRONTEND_URL=http://localhost:3000
   ```

4. **Use Postman to test API endpoints easily**
   - Download: https://www.postman.com
   - Set environment variable for token
   - Test all endpoints

5. **Check MongoDB data in MongoDB Compass**
   - Download: https://www.mongodb.com/products/compass
   - Connect to: mongodb://localhost:27017
   - Browse collections

---

## 🎓 Learning Resources

### Backend
- Express.js: https://expressjs.com/
- MongoDB: https://docs.mongodb.com/
- Mongoose: https://mongoosejs.com/
- JWT: https://jwt.io/

### Frontend
- MDN Web Docs: https://developer.mozilla.org/
- CSS Animations: https://developer.mozilla.org/en-US/docs/Web/CSS/animation
- JavaScript: https://javascript.info/

### Deployment
- Railway: https://railway.app/
- Heroku: https://www.heroku.com/
- AWS: https://aws.amazon.com/
- Firebase: https://firebase.google.com/

---

## 📞 Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| MongoDB won't connect | [See FULLSTACK_SETUP.md](./FULLSTACK_SETUP.md#-troubleshooting) |
| CORS error | [See FULLSTACK_SETUP.md](./FULLSTACK_SETUP.md#-troubleshooting) |
| Port already in use | [See FULLSTACK_SETUP.md](./FULLSTACK_SETUP.md#-troubleshooting) |
| Token invalid | [See FULLSTACK_SETUP.md](./FULLSTACK_SETUP.md#-troubleshooting) |
| Can't find module | [See FULLSTACK_SETUP.md](./FULLSTACK_SETUP.md#-troubleshooting) |

---

## ✅ Checklist Before First Run

- [ ] Node.js installed (v14+)
- [ ] MongoDB installed or Atlas account created
- [ ] Git repository cloned
- [ ] Backend dependencies installed (`npm install`)
- [ ] `.env` file updated with MongoDB URI
- [ ] MongoDB running (`mongod`)
- [ ] Backend server started (`npm start`)
- [ ] Frontend server started or file opened
- [ ] Browser console checked (F12)
- [ ] Test API health: `/api/health`

---

## 🎉 What's Next?

1. **Understand the project** → Read PROJECT_OVERVIEW.md
2. **Set it up** → Follow QUICKSTART.md
3. **Explore the code** → Open files and read comments
4. **Make changes** → Try adding a feature
5. **Deploy** → Put it on the internet
6. **Share** → Tell others about your creation!

---

## 📚 Documentation Files at a Glance

```
Documentation Hierarchy:
│
├─ QUICKSTART.md
│  └─ Fastest way to get running
│
├─ FULLSTACK_README.md
│  └─ High-level overview
│
├─ FULLSTACK_SETUP.md
│  └─ Detailed setup & API reference
│
├─ PROJECT_OVERVIEW.md
│  └─ Architecture & deep dive
│
└─ blogging/
   ├─ README.md
   ├─ FEATURES.md
   ├─ ANIMATIONS.md
   └─ SETUP.md
```

---

## 🚀 You're Ready!

Everything you need is documented. Pick a starting point and begin:

- 🏃 **In a hurry?** → [QUICKSTART.md](./QUICKSTART.md)
- 📚 **Want to learn?** → [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
- 🔧 **Want to configure?** → [FULLSTACK_SETUP.md](./FULLSTACK_SETUP.md)
- 🎨 **Want to customize?** → [Frontend docs](./blogging/README.md)

**Happy coding! 🚀**

---

*HashBlog - A Production-Ready Blogging Platform for Developers*
