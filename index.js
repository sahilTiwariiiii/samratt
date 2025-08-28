const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const deviceRoutes = require("./routes/devices")
const authRoutes = require("./routes/auth")
const errorHandler = require("./middleware/errorHandler")
const path=require('path')
const dotenv = require("dotenv")
dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,'./samrat/dist')))
// Routes
app.use("/api/devices", deviceRoutes)
app.use("/api/auth", authRoutes)

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" })
})

// Error handling middleware (must be last)
app.use(errorHandler)


app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./samrat/dist/index.html"));
});
// MongoDB connection 
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/device-reports", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error("Database connection failed:", error.message)
    process.exit(1)
  }
}

// Start server
const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`Health check: http://localhost:${PORT}/health`)
  })
}

startServer()

module.exports = app
