import { Blog } from "../models/Blog.js"; // Import the Blog model

// Create a new blog
export const createBlog = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.userId; // Extract userId from req.user

  // Validate incoming data
  if (!title || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Title and description are required" });
  }

  try {
    const newBlog = await Blog.create({
      title,
      description,
      author: userId,
    });

    return res.status(201).json({ success: true, blog: newBlog });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Unable to create blog", error });
  }
};

// Update an existing blog
export const updateBlog = async (req, res) => {
  const { blogId } = req.params; // Get blog ID from params
  const { title, description } = req.body;
  const userId = req.user.userId; // Extract userId from req.user

  // Validate incoming data
  if (!title && !description) {
    return res.status(400).json({
      success: false,
      message: "Title or description is required to update",
    });
  }

  try {
    console.log({ blogId, userId });
    const blog = await Blog.findOne({ _id: blogId, author: userId });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found or unauthorized" });
    }

    if (title) blog.title = title;
    if (description) blog.description = description;

    return res.status(200).json({ success: true, blog: await blog.save() });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Unable to update blog", error });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  const { blogId } = req.params;
  const userId = req.user.userId;

  try {
    const blog = await Blog.findOneAndDelete({ _id: blogId, author: userId });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found or unauthorized" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Unable to delete blog", error });
  }
};

export const getSingleBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    return res
      .status(200)
      .json({ success: false, blog: await Blog.findById(blogId) });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Unable to delete blog", error });
  }
};

// Get all blogs of the logged-in user
export const getAllMyBlogs = async (req, res) => {
  const userId = req.user.userId;

  try {
    const blogs = await Blog.find({ author: userId });

    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Unable to fetch blogs", error });
  }
};
// Get all blogs of the logged-in user
export const getAllBlogs = async (req, res) => {
  try {
    return res.status(200).json({ success: true, blogs: await Blog.find() });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Unable to fetch blogs", error });
  }
};
