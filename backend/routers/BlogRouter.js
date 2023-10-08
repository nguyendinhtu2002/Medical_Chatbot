import express from'express';
import {blogController} from'../controllers/blogController';

const router = express.Router();

router.post('/', blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/update/:id', blogController.updateBlog); 
router.delete('/delete/:id', blogController.deleteBlog);

export default router;