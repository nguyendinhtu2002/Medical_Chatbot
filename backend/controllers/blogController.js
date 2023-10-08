import Blog from "../models/Blog"; // Import mô hình "Blog"

// Controller cho mô hình "Blog"
const blogController = {
  createBlog: async (req, res) => {
    try {
      const { title, content, author, category, images } = req.body;
      const newBlog = new Blog({ title, content, author, category, images });
      const savedBlog = await newBlog.save();
      res.status(201).json(savedBlog);
    } catch (error) {
      res.status(500).json({ error: "Lỗi máy chủ" });
    }
  },

  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Lỗi máy chủ" });
    }
  },

  getBlogById: async (req, res) => {
    try {
      const blogId = req.params.id;
      const blog = await Blog.findById(blogId);
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).json({ error: "Không tìm thấy bài viết" });
      }
    } catch (error) {
      res.status(500).json({ error: "Lỗi máy chủ" });
    }
  },
  
  updateBlog: async (req, res) => {
    try {
      const blogId = req.params.id;
      const { title, content, category, images } = req.body;
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { title, content, category, images },
        { new: true }
      );
      if (updatedBlog) {
        res.json(updatedBlog);
      } else {
        res.status(404).json({ error: "Không tìm thấy bài viết" });
      }
    } catch (error) {
      res.status(500).json({ error: "Lỗi máy chủ" });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const blogId = req.params.id;
      const deletedBlog = await Blog.findByIdAndRemove(blogId);
      if (deletedBlog) {
        res.json(deletedBlog);
      } else {
        res.status(404).json({ error: "Không tìm thấy bài viết" });
      }
    } catch (error) {
      res.status(500).json({ error: "Lỗi máy chủ" });
    }
  },
};

export { blogController };
