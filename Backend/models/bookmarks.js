const mongoose = require("mongoose");
const bookmarks = mongoose.Schema({
    user_ID: {type: mongoose.Schema.Types.ObjectId, ref:"users", required:true},
    book_ID: {type: mongoose.Schema.Types.ObjectId, ref:"books", required:true},
    page_number: {type: Number, required:true},
})

module.exports = mongoose.model("bookmarks", bookmarks);