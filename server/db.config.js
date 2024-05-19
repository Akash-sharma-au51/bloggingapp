const mongoose = require('mongoose')
require('dotenv').config()

const URI = process.env.URI

const connection = async()=>{
    try {
        await mongoose.connect(URI)
        console.log("connected to database")
    } catch (error) {
        console.error("error connecting",error);
        
    }
}
module.exports = connection