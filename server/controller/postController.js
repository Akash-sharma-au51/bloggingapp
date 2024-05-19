const Posts = require("../model/postModel");

const createpost = async (req, res) => {
    const { title, description, author, image } = req.body;
    if (!description || !author) {
        return res.status(400).json({
            message: "please provide description and author"
        });
    }
    try {
        let post = await Posts.create({
            title,
            description,
            author,
            image
        });
        res.status(201).json({
            message: "post created successfully",
            post
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }
};

// Find all posts
const getallposts = async (req, res) => {
    try {
        let posts = await Posts.find();
        res.status(200).json({
            message: "posts fetched successfully",
            posts
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }
};

// Find post by title
const findpostsbytitle = async (req, res) => {
    try {
        const { title } = req.params;
        const post = await Posts.findOne({ title });
        if (!post) {
            return res.status(404).json({
                message: "Cannot find the post with this title"
            });
        }
        res.status(200).json({
            message: "post fetched successfully",
            post
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }
};

// Update data
const updatedata = async (req, res) => {
    try {
        const { id, updateddata } = req.body;
        if (!id) {
            return res.status(400).json({
                message: "data not found"
            });
        }
        const record = await Posts.findByIdAndUpdate(id, updateddata, { new: true });
        if (!record) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        res.status(200).json({
            message: "post updated successfully",
            post: record
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }
};

// Delete data
const deleteddata = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                message: "can't find the id"
            });
        }
        const deletedata = await Posts.findByIdAndDelete(id);
        if (!deletedata) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        res.status(200).json({
            message: "deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }
};

module.exports = { createpost, updatedata, deleteddata, findpostsbytitle, getallposts };
