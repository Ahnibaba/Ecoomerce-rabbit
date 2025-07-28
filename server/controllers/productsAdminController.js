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

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      await product.deleteOne()
      res.json({ message: "Product removed" })
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
    console.log("Error in the deleteProduct function in the productAdminController: ", error)
    res.status(500).json({ message: "Server Error" })
  }
}


module.exports = { getAllProduct, deleteProduct }