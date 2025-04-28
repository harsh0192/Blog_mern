import React from 'react'
import Navbar from './components/Navbar'
import {Routes,Route} from "react-router-dom"
import Blog from './pages/Blog'
import Login from './pages/Login'
import Register from './pages/Register'
import UserBlogs from './pages/UserBlogs'
import CreateBlog from './pages/CreateBlog'
import BlogDetails from './pages/BlogDetails'
import  { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Navbar></Navbar>
    <Toaster/>
    <Routes>
      
      <Route path='/' element={<Blog/>}/>
      <Route path='/blogs' element={<Blog/>}/>
      <Route path='/my-blogs' element={<UserBlogs/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/create-blog' element={<CreateBlog/>}/>
      <Route path='/blog-details/:id' element={<BlogDetails/>}/>
    </Routes>
    </>
  )
}

export default App