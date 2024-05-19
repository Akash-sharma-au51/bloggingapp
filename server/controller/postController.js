const Posts = require('../model/postModel');

// Create a new post
const createPost = async (req, res) => {
    const { title, description, author, image } = req.body;
    if (!description || !author) {
        return res.status(400).json({
            message: 'Please provide description and author'
        });
    }
    try {
        const post = await Posts.create({ title, description, author, image });
        res.status(201).json({
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Find post by title
const findPostsByTitle = async (req, res) => {
    const { title } = req.params;
    try {
        const post = await Posts.findOne({ title });
        if (!post) {
            return res.status(404).json({
                message: 'Cannot find the post with this title'
            });
        }
        res.status(200).json({
            message: 'Post fetched successfully',
            post
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Update post data
const updateData = async (req, res) => {
    const { id, updatedData } = req.body;
    if (!id || !updatedData) {
        return res.status(400).json({
            message: 'ID and updated data must be provided'
        });
    }
    try {
        const updatedPost = await Posts.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedPost) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }
        res.status(200).json({
            message: 'Post updated successfully',
            post: updatedPost
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Delete post
const deleteData = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            message: 'ID must be provided'
        });
    }
    try {
        const deletedPost = await Posts.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }
        res.status(200).json({
            message: 'Post deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    findPostsByTitle,
    updateData,
    deleteData
};
