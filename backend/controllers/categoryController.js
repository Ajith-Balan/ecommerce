import categoryModel from "../models/category.model.js";

export const CreateCategoryController = async (req, res)=>{
try {
    const {name,photo} = req.body
    if(!name){
        return res.status(401).send({message:'name is required'})
    }
    const exisitingCategory = await categoryModel.findOne({name})
    if(exisitingCategory){
        return res.status(200).send({
            success:true,
            message:'category already exists'
        })
    }
    const category = await new categoryModel({name,photo}).save()
    res.status(201).send({
        success:true,
        message:'new category created',
        category
    })
    

} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:'error in category'
    })
    
}
}






export const updateCategoryController = async (req, res) => {
    try {
      const { name,photo } = req.body;
      const { id } = req.params;
      const category = await categoryModel.findByIdAndUpdate(
        id,
        { name,photo },
        { new: true }
      );
      res.status(200).send({
        success: true,
        messsage: "Category Updated Successfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while updating category",
      });
    }
  };
  



  export const categoryControlller = async (req, res) => {
    try {
      const category = await categoryModel.find();
      res.status(200).send({
        success: true,
        message: "All Categories List",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all categories",
      });
    }
  };








  export const singleCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ _id });
      res.status(200).send({
        success: true,
        message: "Get SIngle Category SUccessfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single Category",
      });
    }
  };





  export const deleteCategoryCOntroller = async (req, res) => {
    try {
      const { id } = req.params;
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Categry Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };