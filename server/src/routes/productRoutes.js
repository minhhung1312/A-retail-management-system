const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Business = require("../models/businessModel");
const authMiddleware = require("../middlewares/authMiddlewares");
const { default: mongoose } = require("mongoose");
const productController = require("../controllers/productController");

router.get("/by-tenantURL/:tenantURL", productController.getByTenantURL);
router.get("/get/top-sale/:tenantURL", productController.getTopSale);

router.post(
  "/add",
  authMiddleware.verifyToken,
  productController.addNewProduct
);

router.delete(
  "/:id",
  authMiddleware.verifyToken,
  productController.deleteProduct
);

router.get("/:id", productController.getById);

router.put(
  "/update-quantity",
  authMiddleware.verifyToken,
  productController.updateQuantity
);

router.put("/:id", authMiddleware.verifyToken, productController.updateProduct);

module.exports = router;
