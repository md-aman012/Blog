const Post = require('../models/postModel');   
const slugify = require('slugify');

const createPost = async(req, res) => {
    try {
        const {title, markdownContent} = req.body;
        if(!title || !markdownContent){
            return res.status(400).json({message: 'Please Provide a title and content for post'})   
        }
        const slug = slugify(title, { lower: true, strict: true });
        const newPost =  await Post.create({
                title,
                markdownContent,
                author: req.user.id,
                slug,
            })
            const populatedPost = await newPost.populate('author', 'username');
        res.status(201).json(populatedPost);
    } catch (error) {
        console.log(error)
        res.status(400).json({message: 'Error creating post', error})
    }
}
const getAllPost =  async(req,res) => {
    try {
        const posts = await Post.find()
        .sort({createdAt: -1})
        .populate('author','username');
        return res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error fetching post', error: error.message})
    }
}
const getPostById = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author','username');
        if(post){
            return res.status(200).json(post)
        }else{
            return res.status(404).json({message: 'Post not found'})
        }
    } catch (error) {
        console.log(error);
        if(error.name ==='CastError'){
            return res.status(400).json({message : `invalid post id format ${req.params.id}`})
        }
        return res.status(500).json({message : 'Error fetching post', error: error.message})
    }
}
const getPostBySlug = async(req,res) => {
    try {
        const post = await Post.findOne({slug: req.params.slug}).populate('author','username');
        if(post){
            return res.status(200).json(post)
        }
        else{
            res.status(404).json({message : 'post not found'});

        }
    } catch (error) {
        console.log(error);
        if(error.name ==='CastError'){
            return res.status(400).json({message : `invalid post id format ${req.params.id}`})
        }
        res.status(500).json({message : 'Error fecthing post', error: error.message})
        
    }
}

const updatePost = async(req,res) => {
    try {
        // const post = await Post.findByIdAndUpdate(
        //     req.params.id,
        //      req.body,
        //      {
        //         new: true, // Option to return the document *after* the update has been applied
        //         runValidators: true // Option to enforce schema validation rules on the update
        //      });
        // if(post){
        //     res.status(200).json(updatePost, {message: "Post created"});
        // }else{
        //     res.status(404).json({message: 'Post Not found'})
        // }
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({message: 'Post not found'});
        }
        const isAdmin = (req.user.role || '').toLowerCase() === 'admin';
        if (post.author.toString() !== req.user.id && !isAdmin) {
            return res.status(403).json({ message: 'Not authorized to Update this post' });
        }
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('author', 'username');

        return res.status(200).json({
            message: 'Post updated successfully',
            post: updatedPost,
        });
        
    } catch (error) {
        console.log(error);
        if(error.name ==='CastError'){
            return res.status(400).json({message : `invalid post id format ${req.params.id}`})
        }
        res.status(500).json({message : 'Error Updating post', error: error.message})

         if(error.name ==='ValidationError'){
            return res.status(400).json({message : 'Validation error', error: error.message})
        }
        res.status(500).json({message : 'Error Updatind post', error: error.message})
    }
}

const deletePost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({message: 'Post not found'});
        }
        const isAdmin = (req.user.role || '').toLowerCase() === 'admin';
        if (post.author.toString() !== req.user.id && !isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this post' });
        }
        await post.deleteOne();
        return res.status(200).json({message :'Post deleted succesfully'});
    } catch (error) {
        if(error.name ==="CastError"){
            return res.status(400).json({message:`invalid post id format ${req.params.id}`})
        }
        res.status(500).json({message: 'Error deleting post', error: error.message})
    }
}

const getAdminPost = async(req, res) => {
    try {
        const query = req.user.role === 'admin' ? {} : { author: req.user.id };
        const posts = await Post.find(query)
            .sort({createdAt: -1})
            .populate('author','username');
        return res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error fetching post from author', error: error.message})
    }
}

module.exports ={
    createPost,
    getAllPost,
    getPostById,
    getPostBySlug,
    updatePost,
    deletePost,
    getAdminPost,

}