const Subscribe = require("../models/Subscribe");


const subscribe = async (req, res) => {
  const  { email } = req.body

  if(!email) {
    return res.status(400).json({ message: "Email is required" })
  }


  try {
    let subscribe = await Subscribe.findOne({ email })

    if(subscribe) {
        return res.status(400).json({ message: "email is already subscribed" })
    }

    // Create a new subscriber
    subscribe = new Subscribe({ email })
    await subscribe.save()

    res.status(201).json({ message: "Successfully subscribed to the newsletter" })
  } catch (error) {
    console.error("Error at subscribe function: ", error);
    console.error("Error at subscribe function - message: ", error.message);
    console.error("Error at subscribe function - location: ", error.stack);

    res.status(500).send("Server Error")

    
  }
}

module.exports = { subscribe }