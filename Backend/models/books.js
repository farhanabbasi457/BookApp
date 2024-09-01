const mongoose = require("mongoose");
const books = mongoose.Schema({
    title: { type: String, required: true },
    description: { type:String, required: true },
    cover_image: { type:String, required:true},
    author_ID: { type: mongoose.Schema.Types.ObjectId, ref: "authors" },
    category_ID: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
    pdf:{ type:String, required:true},
})

module.exports = mongoose.model("books", books);