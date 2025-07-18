const Order = require("../models/Order")

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name, email")
    res.json(orders)
  } catch (error) {
    console.log("Error in the getAllOrder function in the orderAdminController: ", error)
    res.status(500).json({ message: "Server Error" })
  }
}

const updateOrderStatus = async (req, res) => {
  try{
    const order = await Order.findById(req.params.id)
    if(order) {
        order.status = req.body.status || order.status
        if(order.status === "Delivered") {
            order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered
        } else {
            order.isDelivered = false
        } 
        order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
       res.status(404).json({ message: "Order not found" }) 
    }
  } catch (error) {
    console.log("Error in the updateOrderStatus function in the orderAdminController: ", error)
    res.status(500).json({ message: "Server Error" })
  }
}

const deleteOrder = async (req, res) => {
   try {
     const order = await Order.findById(req.params.id)
     if(order) {
       await Order.deleteOne()
       res.json({ message: "Order removed" }) 
     } else {
        res.status(404).json({ message: "Order not found" }) 
     }
   } catch (error) {
    console.log("Error in the deleteOrder function in the orderAdminController: ", error)
    res.status(500).json({ message: "Server Error" })
  } 
}

module.exports = { getAllOrder, updateOrderStatus, deleteOrder }