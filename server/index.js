const express = require('express')
require('dotenv').config()
const connection = require("./db.config")
const userRoute = require("./routes/userRoutes")
const postRoute = require("./routes/postRouter")



const port = process.env.port


const app = express()

//api

app.use("/users",userRoute)
app.use("/post",postRoute)


//middleware

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("hello from backend")
})

connection()
app.listen(port,()=>{
    console.log(`app is running on ${port}`)
})