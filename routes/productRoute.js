import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productFiltersController,
  productImageController,
  realtedProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//get image
router.get("/product-image/:pid", productImageController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//payment gatweay
//token
router.get("/braintree/token", braintreeTokenController);

//payement
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
