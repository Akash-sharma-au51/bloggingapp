const express = require('express');
const {
    createPost,
    findPostsByTitle,
    getAllPosts,
    updateData,
    deleteData
} = require('../controller/postController');

const router = express.Router();


router.post('/create', createPost);
router.get('/findbytitle/:title', findPostsByTitle); 
router.get('/', getAllPosts);
router.put('/update', updateData);
router.delete('/delete', deleteData);

module.exports = router;
