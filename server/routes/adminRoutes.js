const express = require("express")
const User = require("../models/User")
const { protect, admin } = require("../middleware/authMiddleware")
const { getUsers, addUser, updateUser, deleteUser } = require("../controllers/adminController")



const router = express.Router()


// @route GET /api/admin/users
// @desc Get all users (Admin only)
// @access Private/Admin
router.get("/", protect, admin, getUsers)


// @route POST /api/admin/users
// @desc Add a new user (admin only)
// @access Private/Admin
router.post("/", protect, admin, addUser)


// @route PUT /api/admin/users/:id
// @desc Update user info (admin only) - Name, email and role
// @access Private/Admin
router.put("/:id", protect, admin, updateUser)

// @route DELETE /api/admin/users/:id
// @desc Delete a user
// @access Private/Admin
router.delete("/:id", protect, admin, deleteUser)


module.exports = router