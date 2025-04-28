import React,{useState,useEffect} from 'react'
import axios  from 'axios';
import BlogCard from '../components/BlogCard';
import { useLocation } from 'react-router-dom';
function Blog() {
  const location = useLocation();
  const [blogs,setBlogs]= useState([])
  //get blogs
  const getAllBlogs= async()=>{
  try{
   const {data}= await axios.get('/api/v1/blog/all-blog')
   if(data){
    setBlogs(data.allblogs)
   }
  }catch(error){
    console.log(error);
  }
  }
useEffect(()=>{
   getAllBlogs();
},[location.state?.refresh])

  return (
    <div>
    {blogs && blogs.map(blog => (
      <BlogCard 
      key={blog._id}
        id={blog._id}
        isUser={localStorage.getItem('userid')===blog.user._id}
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

export default Blog