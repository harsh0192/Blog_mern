import React,{useState,useEffect} from 'react'
import axios from 'axios';
import BlogCard from '../components/BlogCard';
function UserBlogs() {
   const [blogs,setBlogs]= useState([]);

   //get user blogs
   const getUserBlogs= async()=>{
   try{
      const id= localStorage.getItem('userid')
      
   const {data}= await axios.get(`/api/v1/blog/user-blog/${id}`)
    if(data){
      setBlogs(data?.userBlog?.blogs)

    }
   }catch(error){
      console.log(error);
      
   }
   }

   useEffect(()=>{
   getUserBlogs();
   },[])
   console.log(blogs);
   

  return (
    <div>
       {blogs && blogs.map(blog => (
            <BlogCard
            key={blog._id}
              id={blog._id}
              isUser={true}
              title={blog.title || "No Title"}
              description={blog.description || "No Description"}
              image={blog.image || "https://via.placeholder.com/150"} 
              username={blog.user?.username || "Unknown User"}
              time={blog.createdAt || "No Date"}
            />
          ))}
    </div>
  )
}

export default UserBlogs
