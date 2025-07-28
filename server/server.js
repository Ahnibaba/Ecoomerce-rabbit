const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const checkoutRoutes = require("./routes/checkoutRoutes")
const orderRoutes = require("./routes/orderRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const subscribeRoutes = require("./routes/subscribeRoutes")
const adminRoutes = require("./routes/adminRoutes")
const productAdminRoutes = require("./routes/productAdminRoutes")
const orderAdminRoutes = require("./routes/orderAdminRoutes")


const app = express()

app.use(express.json())
app.use(cors({
    origin: ["https://ecoomerce-rabbit-t6ln.vercel.app", "http://localhost:5173"]
}))


dotenv.config()


const PORT = process.env.PORT || 3000

connectDB()

app.get("/", (req, res) => {
    res.send("WELCOME TO RABBIT API")
})

// API Routes
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes)
app.use("/api/checkout", checkoutRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/subscribe", subscribeRoutes)


// Admin
app.use("/api/admin/users", adminRoutes)
app.use("/api/admin/products", productAdminRoutes)
app.use("/api/admin/orders", orderAdminRoutes)


app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${3000}`);
    
})