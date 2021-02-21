const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getProductById,
  createProduct,
  getProduct,
  updateProduct,
  removeProduct,
  getAllProducts,
  getAllUniqueCategories,
  getPhoto,
} = require("../controllers/product");

//All Params
router.param("userId", getUserById);
router.param("productId", getProductById);

//All Routes

//create route
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//get route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", getPhoto);
router.get("/product/categories", getAllUniqueCategories);

//listing route
router.get("/products", getAllProducts);

//update route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//delete route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

module.exports = router;
