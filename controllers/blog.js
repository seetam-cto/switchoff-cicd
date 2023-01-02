import banner from "../models/banner";
import Blog from "../models/blog";
import Tag from "../models/tag";


//get Blogs
export const getBlogs = async (req, res) => {
    try{
        let blogs = await Blog.find()
        .populate("properties")
        .populate("experiences")
        .populate("tags")
        .populate("postedBy", "_id name email createdAt updatedAt")
        .populate("content.editedBy", "_id name email createdAt updatedAt")
        .select("-content.data")
        .exec()
        if(!blogs) return res.status(400).send("No Blogs Found!")
        let result = blogs.map((blog) => {
            return {
                ...blog._doc,
                content: blog.content.sort((a,b) => b.version - a.version)
            }
        })
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.status(400).send("Error in fetching Blogs!")
    }
}

export const getBlog = async (req, res) => {
    try{
        let blog = await Blog.findById(req.params.id)
        .populate("properties")
        .populate("experiences")
        .populate("tags")
        .populate("postedBy", "_id name email createdAt updatedAt")
        .populate("content.editedBy", "_id name email createdAt updatedAt")
        .exec()
        if(!blog) return res.status(400).send("Blog not Found!")
        let result = {
                ...blog._doc,
                content: blog.content.sort((a,b) => b.version - a.version)
            }
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.status(400).send("Error in fetching Blog!")
    }
}

export const getBlogBySlug = async (req, res) => {
    try{
        let blog = await Blog.find({slug: req.params.slug})
        .populate("properties")
        .populate("experiences")
        .populate("tags")
        .populate("postedBy", "_id name email createdAt updatedAt")
        .populate("content.editedBy", "_id name email createdAt updatedAt")
        .exec()
        if(!blog) return res.status(400).send("Blog not Found!")
        let result = {
                ...blog[0]._doc,
                content: blog[0].content.sort((a,b) => b.version - a.version)
            }
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.status(400).send("Error in fetching Blog!")
    }
}

export const addBlog = async (req, res) => {
    let {auth, body} = req
    const blogData = {
        ...body,
        content: [{
            data: body.content,
            version: 0,
            editedBy: auth._id,
            editedOn: new Date()
        }],
        postedBy: auth._id
    }

    const blog = new Blog(blogData)
    try{
        await blog.save()
        return res.status(200).json(blog)
    }catch(err){
        if(err.code === 11000){
            res.status(400).send("Please use unique slugs")
        }else{
            console.log(err)
            res.status(400).send("Couldn't Add Blog")
        }
    }
}

export const updateBlog = async (req, res) => {
    let {auth, body, params} = req
    try{
        let theblog = await Blog.findById(params.id)
        let allversions = theblog.content
        let latestVersion = allversions.sort((a,b) => b.version - a.version)[0].version

        let newBlogData = null
        if(allversions.sort((a,b) => b.version - a.version)[0].data === body.content){
            newBlogData = {
                ...body,
                content: [
                    ...theblog.content
                ]
            }
        }else{
            newBlogData = {
                ...body,
                content: [
                    {
                        data: body.content,
                        version: latestVersion + 1,
                        editedBy: auth._id,
                        editedOn: new Date()
                    },
                    ...theblog.content,
                ]
            }    
        }

        let updated = await Blog.findByIdAndUpdate(params.id, newBlogData, {new: true})
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        res.status(400).send("Couldn't Update Blog")
    }
}

export const trashBlog = async (req, res) => {
    let {params} = req
    try{
        let trashed = await Blog.findByIdAndUpdate(params.id, {trash: true, published: false}, {new: true})
        res.status(200).send(`Blog ${trashed.title} Trashed!`)
    }catch(err){
        console.log(err)
        res.status(400).send("Couldn't Delete Blog")
    }
}

export const restoreBlog = async (req, res) => {
    let {params} = req
    try{
        let trashed = await Blog.findByIdAndUpdate(params.id, {trash: false}, {new: true})
        res.status(200).send(`Blog ${trashed.title} Restoredd!`)
    }catch(err){
        console.log(err)
        res.status(400).send("Couldn't Restore Blog")
    }
}

export const deleteBlog = async (req, res) => {
    let {params} = req
    try{
        let deleted = await Blog.findByIdAndDelete(params.id)
        res.status(200).send(`Blog ${deleted.title} deleted!`)
    }catch(err){
        console.log(err)
        res.status(400).send("Couldn't Delete Blog")
    }
}

//Tags

export const getTags = async (req, res) => {
    try{
        let tag = await Tag.find().exec()
        if(!tag) return res.status(400).send("No Tags Found!")
        res.status(200).json(tag)
    }catch(err){
        console.log(err)
        res.status(400).send("Error in fetching Tags!")
    }
}

export const addTag = async (req, res) => {
    let {auth, body} = req
    const tagData = {
        ...body,
        createdBy: auth._id
    }
    const tag = new Tag(tagData)
    try{
        await tag.save()
        return res.status(200).json(tag)
    }catch(err){
        console.log(err)
        res.status(400).send("Couldn't Add Tag")
    }
}