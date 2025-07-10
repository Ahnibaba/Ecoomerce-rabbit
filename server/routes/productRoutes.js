const express = require("express")
const Product = require("../models/Product")
const { protect, admin } = require("../middleware/authMiddleware")
const { createProduct, updateProduct, deleteProduct, getProducts } = require("../controllers/productController")


const router = express.Router()

router.post("/", protect, admin, createProduct)
router.put("/:id", protect, admin, updateProduct)
router.delete("/:id", protect, admin, deleteProduct)
router.get("/", getProducts)


module.exports = router