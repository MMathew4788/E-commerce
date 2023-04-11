import express from "express";
import { isAdmin, requireSignIn } from "./../middleware/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deletecategoryController,
  singlecategoryController,
  updateCategoryController,
} from "../controllers/CategoryController.js";

const router = express.Router();

//routes
//create-category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update-category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get all categories
router.get("/all-category", categoryController);

//get single category
router.get("/single-category/:slug", singlecategoryController);

//delete category

router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deletecategoryController
);

export default router;
