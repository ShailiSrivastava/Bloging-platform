// API Configuration
const API_URL = 'http://localhost:5000/api';
let authToken = localStorage.getItem('authToken');

class BlogAPI {
  // Auth Methods
  static async register(name, email, password, passwordConfirm) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, passwordConfirm })
      });
      const data = await response.json();
      if (data.success) {
        authToken = data.data.token;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.success) {
        authToken = data.data.token;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static logout() {
    authToken = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  static getAuthHeader() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    };
  }

  // Blog Methods
  static async createBlog(blogData) {
    try {
      const response = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: this.getAuthHeader(),
        body: JSON.stringify(blogData)
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async getAllBlogs(page = 1, limit = 10, category = 'all', search = '') {
    try {
      const params = new URLSearchParams({
        page,
        limit,
        ...(category !== 'all' && { category }),
        ...(search && { search })
      });
      const response = await fetch(`${API_URL}/blogs?${params}`);
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async getBlogById(id) {
    try {
      const headers = authToken ? this.getAuthHeader() : { 'Content-Type': 'application/json' };
      const response = await fetch(`${API_URL}/blogs/${id}`, { headers });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async updateBlog(id, blogData) {
    try {
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeader(),
        body: JSON.stringify(blogData)
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async deleteBlog(id) {
    try {
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeader()
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async likeBlog(id) {
    try {
      const response = await fetch(`${API_URL}/blogs/${id}/like`, {
        method: 'POST',
        headers: this.getAuthHeader()
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async unlikeBlog(id) {
    try {
      const response = await fetch(`${API_URL}/blogs/${id}/unlike`, {
        method: 'POST',
        headers: this.getAuthHeader()
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async getTrendingBlogs() {
    try {
      const response = await fetch(`${API_URL}/blogs/trending`);
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Comment Methods
  static async createComment(blogId, content, parentComment = null) {
    try {
      const response = await fetch(`${API_URL}/comments/${blogId}`, {
        method: 'POST',
        headers: this.getAuthHeader(),
        body: JSON.stringify({ content, parentComment })
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async getComments(blogId, page = 1, limit = 10) {
    try {
      const response = await fetch(`${API_URL}/comments/${blogId}?page=${page}&limit=${limit}`);
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async updateComment(commentId, content) {
    try {
      const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: 'PUT',
        headers: this.getAuthHeader(),
        body: JSON.stringify({ content })
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async deleteComment(commentId) {
    try {
      const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: 'DELETE',
        headers: this.getAuthHeader()
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async likeComment(commentId) {
    try {
      const response = await fetch(`${API_URL}/comments/${commentId}/like`, {
        method: 'POST',
        headers: this.getAuthHeader()
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async unlikeComment(commentId) {
    try {
      const response = await fetch(`${API_URL}/comments/${commentId}/unlike`, {
        method: 'POST',
        headers: this.getAuthHeader()
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // User Methods
  static async getCurrentUser() {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: this.getAuthHeader()
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async getUserById(id) {
    try {
      const response = await fetch(`${API_URL}/auth/user/${id}`);
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async updateProfile(profileData) {
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: this.getAuthHeader(),
        body: JSON.stringify(profileData)
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async followUser(userId) {
    try {
      const response = await fetch(`${API_URL}/auth/follow/${userId}`, {
        method: 'POST',
        headers: this.getAuthHeader()
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async unfollowUser(userId) {
    try {
      const response = await fetch(`${API_URL}/auth/unfollow/${userId}`, {
        method: 'POST',
        headers: this.getAuthHeader()
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default BlogAPI;
