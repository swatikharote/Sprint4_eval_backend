const mongoose = require("mongoose");


const PostSchema = mongoose.Schema({
    title: String,
    body: String,
    no_of_comments: Number,
    userId: String,
    device: { type: String, enum: ["Laptop", "Tablet", "Mobile"] }
},
    { versionKey: false }
)

const PostModel = mongoose.model("posts", PostSchema)

module.exports = { PostModel }