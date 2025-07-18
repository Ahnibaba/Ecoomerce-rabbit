const cloudinary = require("cloudinary").v2
const streamifier = require("streamifier")

require("dotenv").config()

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadImages = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file Uploaded" })
        }

        // Function to handle the stream upload to cloudinary
        const streamUpload = async (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(error)
                    }
                })

                // Use streamifier to convert file buffer to a stream
                streamifier.createReadStream(fileBuffer).pipe(stream)
            })


        }

        // call the streamUpload function
        const result = await streamUpload(req.file.buffer)

        // Respond with the uploaded image URL
        res.json({ imageUrl: result.secure_url })
    } catch (error) {
        console.log("Error in the upload image function: ", error);
        res.status(500).send("Server error")

    }
}

module.exports = { uploadImages }