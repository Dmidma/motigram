const mongoose = require('mongoose')



const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    img: {
        type: String,
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    caption: {
        type: String,
        trim: true
    }


})




const Post = mongoose.model('Post', postSchema)


module.exports = Post
