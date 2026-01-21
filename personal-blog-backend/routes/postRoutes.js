const express = require('express')
const {protect} = require('../middleware/authMiddleware')
const postController = require('../controllers/postController')

// const {
//     createPost,
//     getAllPost,
//     getPostById,
//     updatePost,
//     deletePost
// } = require('../controllers/postController')

const router = express.Router();

// router.route('/').get(getAllPost)

// router.route('/:id').get(getPostById)

// router.post('/',protect,createPost)

// router.put('/:id',protect,updatePost)

// router.delete('/:id',protect,deletePost)

router.get('/',postController.getAllPost);
router.get('/:id',postController.getPostById);

router.post('/',protect,postController.createPost);
router.put('/:id',protect,postController.updatePost);
router.delete('/:id',protect,postController.deletePost);


module.exports = router;


