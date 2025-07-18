const express = require("express")
const multer = require("multer")
const { uploadImages } = require("../controllers/uploadController")

const router = express.Router()


// Multer setup using memory storage
const storage = multer.memoryStorage()
const upload = multer({ storage })


router.post("/", upload.single("image"), uploadImages)


module.exports = router