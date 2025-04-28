const express= require("express");
const { getAllBlogsController, createBlogController, updatBlogController, getBlogByIdController, deleteBlogController, userBlogController } = require("../controllers/blogController");

const router= express.Router();

//get all blog
router.get('/all-blog',getAllBlogsController
);
// create blog
router.post('/create-blog',createBlogController);

//update blog
router.put('/update-blog/:id',updatBlogController);

// get specific blog || single blog 
router.get('/get-blog/:id',getBlogByIdController);

//Delete blog
router.delete('/delete-blog/:id',deleteBlogController);

//Get user blog
router.get('/user-blog/:id',userBlogController);


module.exports= router;