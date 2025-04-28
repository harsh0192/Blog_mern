import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useNavigate,useParams } from "react-router-dom";
import  toast from 'react-hot-toast';


function BlogDetails() {
const [blog,setBlogs]= useState({})
const id= useParams().id;
  
    const navigate = useNavigate();
     const [inputs, setInputs] = useState({
       
     });


  //get blog details
  const getBlogDetail= async ()=>{
   try{
    const {data}= await axios.get(`/api/v1/blog/get-blog/${id}`)
    if(data){
      setBlogs(data?.blog)
      setInputs({
         title:data?.blog.title,
         description:data?.blog.description,
         image:data?.blog.image
      })
    }
   }catch(error){
   console.log(error);
   
   }
  }
  useEffect(()=>{
   getBlogDetail()
   
},[id])
   

const handleChange = (e) => {
   setInputs((prevState) => ({
     ...prevState,
     [e.target.name]: e.target.value,
   }));
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   
   // Get user ID from localStorage (use the correct key "userid")
   const userId = localStorage.getItem("userid");
   if (!userId) {
     toast.success("User not logged in");
     return;
   }

   try {
     const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
       title: inputs.title,
       description: inputs.description,
       image: inputs.image,
       user: userId,  // Include userId here
     });
     
     if (data) {
       toast.success("Blog updated");
       navigate('/my-blogs');
     }
   } catch (error) {
     console.log(error);
   }
 };
   

  return (
    <>
    <form onSubmit={handleSubmit}>
      <Box
        width={"50%"}
        border={3}
        borderRadius={10}
        padding={3}
        margin="auto"
        boxShadow={"10px 10px 20px #ccc"}
        display="flex"
        flexDirection={"column"}
        marginTop="30px"
      >
        <Typography
          variant="h2"
          textAlign={"center"}
          fontWeight="bold"
          padding={3}
          color="grey"
        >
          Update a Post
        </Typography>

        <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
          Title
        </InputLabel>
        <TextField
          name="title"
          value={inputs.title}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />

        <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
          Description
        </InputLabel>
        <TextField
          name="description"
          value={inputs.description}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />

        <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
          Image URL
        </InputLabel>
        <TextField
          name="image"
          value={inputs.image}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        
        <Button type="submit" color="warning" variant="contained">
          UPDATE
        </Button>
      </Box>
    </form>
    </>
  )
}

export default BlogDetails