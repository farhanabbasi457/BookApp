const mongoose = require("mongoose");
const authors = mongoose.Schema({
    name: {type: String, required:true},
    biography: {type: String, required:true},
    photo: {type: String, required:true},
})

module.exports = mongoose.model("authors", authors);