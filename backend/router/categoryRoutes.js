import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
import { CreateCategoryController , updateCategoryController, categoryControlller, singleCategoryController, deleteCategoryCOntroller } from "../controllers/categoryController.js";

const router = express.Router()

router.post('/create-category', requireSignIn, isAdmin, CreateCategoryController)


router.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    updateCategoryController
  );



  router.get("/get-category", categoryControlller);


  router.get("/single-category/:id", singleCategoryController);




  router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryCOntroller
  );



export default router;

