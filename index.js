const express = require("express")
const dotenv = require("dotenv").config()
const db = require("./config/db")

const app = express()
app.use(express.json())

const authRoute= require("./routes/auth")
const userRoute = require("./routes/user")
const todoRoute = require("./routes/task")

app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/todos",todoRoute)

app.get("/test",(req,res)=>{
    res.send("Hello World")
})

PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})
