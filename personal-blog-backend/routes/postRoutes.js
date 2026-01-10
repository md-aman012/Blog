const express = require('express')

const {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost
} = require('../controllers/postController')

const router = express.Router();

router.route('/').get(getAllPost).post(createPost);

router.route('/:id').get(getPostById).patch(updatePost).delete(deletePost);

module.exports = router;


