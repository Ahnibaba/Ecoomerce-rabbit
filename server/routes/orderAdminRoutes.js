const express = require("express")
const { protect, admin } = require("../middleware/authMiddleware")
const { getAllOrder, updateOrderStatus, deleteOrder } = require("../controllers/orderAdminController")


const router = express.Router()



// @route GET /api/admin/orders
// @desc Get all order (Admin only)
// @access Private/Admin
router.get("/", protect, admin, getAllOrder)


// @route PUT /api/admin/orders/:id
// @desc Update order status
// @access Private/Admin
router.put("/:id", protect, admin, updateOrderStatus)

// @route DELETE /api/admin/orders/:id
// @desc delete an order
// @access Private/Admin
router.delete("/:id", protect, admin, deleteOrder)



module.exports = router