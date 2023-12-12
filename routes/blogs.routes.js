const express = require("express");
const {
  verifyJWT,
  verifyAdmin
} = require("../middlewares/auth.middleware");
const {
  createBlogs,
  getAllBlogs,
  getSingleBlogs,
  updateBlogs,
  deleteBlogs,
  searchBlogsController,
} = require("../controllers/blogs.controllers");

const blogsRouter = express.Router();

// admin routes
blogsRouter.post("/", verifyJWT, verifyAdmin, createBlogs);
blogsRouter.put("/:id", verifyJWT, verifyAdmin, updateBlogs);
blogsRouter.delete("/:id", verifyJWT, verifyAdmin, deleteBlogs);

// user routes

blogsRouter.get("/", getAllBlogs);
blogsRouter.get("/search/:keyword", searchBlogsController)
blogsRouter.get("/:title", getSingleBlogs);


module.exports = blogsRouter;