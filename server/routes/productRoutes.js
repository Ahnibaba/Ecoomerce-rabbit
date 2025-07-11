const express = require("express")
const Product = require("../models/Product")
const { protect, admin } = require("../middleware/authMiddleware")
const { createProduct, updateProduct, deleteProduct, getProducts, getProduct, getSimilarProducts, bestSeller, newArrivals } = require("../controllers/productController")


const router = express.Router()

router.post("/", protect, admin, createProduct)
router.put("/:id", protect, admin, updateProduct)
router.delete("/:id", protect, admin, deleteProduct)
router.get("/", getProducts)
router.get("/best-seller", bestSeller)
router.get("/new-arrivals", newArrivals) 
router.get("/:id", getProduct)
router.get("/similar/:id", getSimilarProducts)



module.exports = router