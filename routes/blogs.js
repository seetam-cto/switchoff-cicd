import express from "express"
import { addBlog, addTag, deleteBlog, getBlog, getBlogs, getTags, trashBlog, updateBlog } from "../controllers/blog"
import { requireSignIn, isAuthor } from "../middlewares"

const router = express.Router()

router.get("/blogs", getBlogs)
router.get("/blogs/:id", getBlog)
router.post("/blogs/add", requireSignIn, isAuthor, addBlog)
router.put("/blogs/update/:id", requireSignIn, isAuthor, updateBlog)
router.put("/blogs/trash/:id", requireSignIn, isAuthor, trashBlog)
router.delete("/blogs/delete/:id", requireSignIn, isAuthor, deleteBlog)

//tags
router.get("/tags", getTags)
router.post("/tags/add", requireSignIn, isAuthor, addTag)

module.exports = router