const express = require("express")
const { subscribe } = require("../controllers/subscriberController")


const router = express.Router()


// @route POST /api/subscribe
// @desc Handle newsletter subscription
// @access Public
router.post("/", subscribe)


module.exports = router
