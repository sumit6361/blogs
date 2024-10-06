import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./connectDB.js";
import {
  login,
  loginWithGoogleAuthId,
  signup,
} from "./controllers/userControllers.js";
import { authMiddleware } from "./authMiddleware.js";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getAllMyBlogs,
  getSingleBlog,
  updateBlog,
} from "./controllers/blogControllers.js";

dotenv.config({
  path: ".env",
});

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

// auth related APIs
app.post("/api/v1/auth/login", login);
app.post("/api/v1/auth/signup", signup);
app.post("/api/v1/auth/googleAuth", loginWithGoogleAuthId);

app.post("/api/v1/auth/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

// blogs related APIs
app.post("/api/v1/blogs", authMiddleware, createBlog);
app.get("/api/v1/blogs/:blogId", getSingleBlog);
app.put("/api/v1/blogs/:blogId", authMiddleware, updateBlog);
app.delete("/api/v1/blogs/:blogId", authMiddleware, deleteBlog);
app.get("/api/v1/my-blogs", authMiddleware, getAllMyBlogs);
app.get("/api/v1/blogs", getAllBlogs);
app.use((req, res) => {
  console.log("first");
  res.status(400).json({
    message: "Not found",
  });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("listening on: ", PORT);
    });
  })
  .catch((err) => {
    console.log("err while spin up server: ", err);
  });
