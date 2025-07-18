const express = require("express")
const { protect } = require("../middleware/authMiddleware")
const { addProductToCart, updateCartQuantity, removeProductFromCart, getUserCart, mergeUserCart } = require("../controllers/cartController")
const router = express.Router()

router.post("/", addProductToCart)
router.put("/", updateCartQuantity)
router.delete("/", removeProductFromCart)
router.get("/", getUserCart)
router.post("/merge", protect, mergeUserCart)


module.exports = router