const { default: mongoose } = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//get all blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const allblogs = await blogModel.find({}).populate('user');
    if (!allblogs) {
      return res.status(500).json({ message: "No blog is present" });
    }
    return res.status(200).json({ BlogCount: allblogs.length, allblogs });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Create blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image,user } = req.body;
    if (!title || !description || !image || !user) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser= await userModel.findById(user)
    if(!existingUser){
      return res.status(404).json({"message":"Unable to find user"})
    }
    // we will use session of mongoose and then updatethe blog 

    const newBlog = new blogModel({ title, description, image,user });
    const session= await mongoose.startSession()
     session.startTransaction()
     await newBlog.save({session})
     existingUser.blogs.push(newBlog)
     await existingUser.save({session})
     await session.commitTransaction();
     session.endSession();
    return res.status(200).json({ message: "blog created", newBlog });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// update blog
exports.updatBlogController = async (req, res) => {
  try {
    const {id} = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog updated",
      blog,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// find specfic blog through id
exports.getBlogByIdController = async (req, res) => {
  try {
   const {id}= req.params
  const blog= await blogModel.findById(id);
  if(!blog){
   return res.status(500).json({"message":"No such kind of blog is present"})
  }
  return res.status(200).json({blog,"message":"fetched single blog"})


  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

//Delete Blog
exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing BLog",
      error,
    });
  }
};
// get user specific blog || get user blog
exports.userBlogController= async (req,res)=>{
  try{
   const userBlog= await userModel.findById(req.params.id).populate("blogs")
   if(!userBlog){
    return res.status(404).json({"message":"Blog not found"})
   }
   return res.status(200).json({"message":"Blog found",userBlog})


  }catch(error){
    return res.status(500).json({ message: "Server error", error });
  }
}



