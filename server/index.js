const express = require('express')
const cors = require('cors')
const port = 8000
const app = express()
app.use(express.json())
app.use(cors())
const connection = require('./controllers/connection')


app.listen(port,()=>{
    console.log(`app is running on ${port}`)
})



