const Product = require("../models/Product")



const getAllProduct = async (req, res) => {
 try {
   const products = await Product.find({})
   res.json(products)
 } catch (error) {
    console.log("Error in the getALLProduct function in the productAdminController: ", error)
    res.status(500).json({ message: "Server Error" })
 }
}


module.exports = { getAllProduct }