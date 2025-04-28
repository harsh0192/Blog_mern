//db connection here 
const mongoose= require("mongoose")
const colors = require("colors")
const connectDB= async ()=>{
    try{
   await  mongoose.connect(process.env.MONGO_URL)
    console.log(`Connecting to mongo db database`.bgMagenta.white);
    
    }catch(error){
      console.log("Mongo db connection error",error);
      
    }
}

module.exports= connectDB