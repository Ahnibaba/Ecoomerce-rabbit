const express = require("express")
const { protect } = require("../middleware/authMiddleware")

const { myOrders, myOrder } = require("../controllers/orderController")



const router = express.Router()

// @route GET /api/orders/my-orders
// @desc Get logged-in user's orders
// @access Private
router.get("/my-orders", protect, myOrders)


// @route GET /api/orders/:id
// @desc GET order details by ID
// @access Private
router.get("/:id", protect, myOrder)


module.exports = router