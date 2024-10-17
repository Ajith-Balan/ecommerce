import mongoose, {Mongoose,model}from "mongoose";
const categorySchema=new mongoose.Schema
({

    name: {
        type: String,
        required: true,
        unique: true,
      },
      photo: {
        type: String,
      }
  
      
   
    }

)
export default mongoose.model.category || mongoose.model('categorys',categorySchema)