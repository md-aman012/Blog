const express = require('express')
const {protect} = require('../middleware/authMiddleware')
const postController = require('../controllers/postController')

const router = express.Router();



router.get('/',postController.getAllPost);
router.get('/id/:id',protect,postController.getPostById);
router.get('/:slug',postController.getPostBySlug);
router.post('/',protect,postController.createPost);
router.put('/:id',protect,postController.updatePost);
// router.get('/:id',protect,postController.updatePost)
router.delete('/:id',protect,postController.deletePost);


module.exports = router;


