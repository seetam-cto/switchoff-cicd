import express from "express"
import { addBlog, addTag, deleteBlog, getBlog, getBlogs, getTags, restoreBlog, trashBlog, updateBlog, getBlogBySlug, getPublishedBlogs } from "../controllers/blog"
import { requireSignIn, isAuthor } from "../middlewares"

const router = express.Router()

router.get("/blogs", getBlogs)
router.get("/blogs/published", getPublishedBlogs)
router.get("/blogs/:id", getBlog)
router.get("/blogs/slug/:slug", getBlogBySlug)
router.post("/blogs/add", requireSignIn, isAuthor, addBlog)
router.put("/blogs/update/:id", requireSignIn, isAuthor, updateBlog)
router.put("/blogs/trash/:id", requireSignIn, isAuthor, trashBlog)
router.put("/blogs/restore/:id", requireSignIn, isAuthor, restoreBlog)
router.delete("/blogs/delete/:id", requireSignIn, isAuthor, deleteBlog)

//tags
router.get("/tags", getTags)
router.post("/tags/add", requireSignIn, isAuthor, addTag)

module.exports = router