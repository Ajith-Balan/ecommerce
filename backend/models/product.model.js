import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    MRP:{
      type:Number,
      required:true
    },
    size:{
      type:String,
      required:true
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      trim: true,
    },
    photo2:{
      type:String
    },
     photo3:{
      type:String
    },
     photo4:{
      type:String
    },
     photo5:{
      type:String
    },
  
  },
  { timestamps: true }
);



export default mongoose.model("products", productSchema);

