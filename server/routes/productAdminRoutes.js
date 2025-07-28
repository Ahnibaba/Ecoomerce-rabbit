const express = require("express")
const { protect, admin } = require("../middleware/authMiddleware")
const { getAllProduct } = require("../controllers/productsAdminController")
const { deleteProduct } = require("../controllers/productController")

const router = express.Router()


// @route GET /api/admin/products
// @desc Get all products (Admin only)
// @access Private/Admin
router.get("/", protect, admin, getAllProduct)
router.delete("/:id", protect, admin, deleteProduct)


module.exports = router