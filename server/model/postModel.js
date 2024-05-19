const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String,
        required:true,
        minlength:100
    },
    author:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
})

const Posts = mongoose.model("Posts",postSchema)
module.exports = Posts