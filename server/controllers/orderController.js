const Order = require("../models/Order")


const myOrders = async (req, res) => {
  try {
    // Find orders for the authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
        createdAt: -1
    }) // sort by most recent orders
    res.json(orders)
  }catch(error) {
    console.error("Error in myOrders function: ", error)
    res.status(500).json({ message: "Server Error" })
  }
}


const myOrder = async (req, res) => {
   try {
     const order = await Order.findById(req.params.id).populate({
       path: "user",
       select: "name email"
     })

     if(!order) {
        res.status(404).json({ message: "Order not found" })
     }

     // Return the full order details
     res.json(order)
   }catch(error) {
    console.error("Error in myOrder function:", error)
    res.status(500).json({ message: "Server Error" })
  } 
}

module.exports = { myOrders, myOrder }