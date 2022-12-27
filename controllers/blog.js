import banner from "../models/banner";
import Blog from "../models/blog";


//get Blogs
export const getBlogs = async (req, res) => {
    try{
        let blogs = await Blog.find()
        .populate("properties")
        .populate("experiences")
        .exec()
        if(!blogs) return res.status(400).send("No Blogs Found!")
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
        .exec()
        if(!blog) return res.status(400).send("Blog not Found!")
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
        postedBy: auth._id
    }

    const blog = new Blog(blogData)
    try{
        await blog.save()
        return res.status(200).json(blog)
    }catch(err){
        console.log(err)
        res.status(400).send("Couldn't Add Blog")
    }
}

export const updateBlog = async (req, res) => {
    let {body, params} = req
    try{
        let updated = await Blog.findByIdAndUpdate(params.id, body, {new: true})
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        res.status(400).send("Couldn't Update Blog")
    }
}

export const trashBlog = async (req, res) => {
    let {params} = req
    try{
        let trashed = await banner.findByIdAndUpdate(params.id, {trash: true}, {new: true})
        res.status(200).send(`Blog ${trashed.title} Trashed!`)
    }catch(err){
        console.log(err)
        res.status(400).send("Couldn't Delete Blog")
    }
}
export const deleteBlog = async (req, res) => {
    let {params} = req
    try{
        let deleted = await banner.findByIdAndDelete(params.id)
        res.status(200).send(`Blog ${deleted.title} deleted!`)
    }catch(err){
        console.log(err)
        res.status(400).send("Couldn't Delete Blog")
    }
}