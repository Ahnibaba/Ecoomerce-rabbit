const express = require("express")
const Checkout = require("../models/Checkout")
const Cart = require("../models/Cart")
const Product = require("../models/Product")
const Order = require("../models/Order")
const { protect } = require("../middleware/authMiddleware")
const { checkout, checkOutPay, finalizeCheckout  } = require("../controllers/checkoutController")

const router = express.Router()


// @route POST /api/checkout
// @desc Create a new checkout session
// access Private
router.post("/", protect, checkout)

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private
router.put("/:id/pay", protect, checkOutPay)

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access Private
router.post("/:id/finalize", protect, finalizeCheckout )


module.exports = router

