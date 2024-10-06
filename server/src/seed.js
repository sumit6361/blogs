import mongoose from "mongoose";
import { User } from "./models/User.js"; // Adjust the path based on your project structure
import { Blog } from "./models/Blog.js"; // Adjust the path based on your project structure
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const seedUsers = async () => {
  const users = [
    {
      email: "user1@example.com",
      password: "password1", // This will be hashed
    },
    {
      email: "user2@example.com",
      password: "password2", // This will be hashed
    },
    {
      email: "user3@example.com",
      googleId: "google_id_1", // Google user, no password needed
    },
  ];

  // Create users and hash passwords
  for (const user of users) {
    const newUser = new User(user);
    await newUser.save();
  }
};

const seedBlogs = async () => {
  const users = await User.find({}); // Get all users to associate with blogs
  const blogs = [
    {
      title: "First Blog Post",
      description: "This is the description for the first blog post.",
      author: users[0]._id, // Associate with the first user
    },
    {
      title: "Second Blog Post",
      description: "This is the description for the second blog post.",
      author: users[1]._id, // Associate with the second user
    },
    {
      title: "Third Blog Post",
      description: "This is the description for the third blog post.",
      author: users[0]._id, // Associate with the first user again
    },
    {
      title: "Fourth Blog Post",
      description: "This is the description for the fourth blog post.",
      author: users[1]._id,
    },
    {
      title: "Fifth Blog Post",
      description: "This is the description for the fifth blog post.",
      author: users[0]._id,
    },
    {
      title: "Sixth Blog Post",
      description: "This is the description for the sixth blog post.",
      author: users[1]._id,
    },
    {
      title: "Seventh Blog Post",
      description: "This is the description for the seventh blog post.",
      author: users[0]._id,
    },
    {
      title: "Eighth Blog Post",
      description: "This is the description for the eighth blog post.",
      author: users[1]._id,
    },
  ];

  // Create blogs
  for (const blog of blogs) {
    const newBlog = new Blog(blog);
    await newBlog.save();
  }
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to the database");

    await seedUsers();
    console.log("Users seeded");

    await seedBlogs();
    console.log("Blogs seeded");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from the database");
  }
};

seedDatabase();
