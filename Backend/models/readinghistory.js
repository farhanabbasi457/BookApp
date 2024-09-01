const mongoose = require("mongoose");
const readinghistory = mongoose.Schema({
    user_ID: {type: mongoose.Schema.Types.ObjectId, ref:"users", required:true},
    book_ID: {type: mongoose.Schema.Types.ObjectId, ref:"books", required:true},
    start_time: {type: String, required:true},
    end_time: {type: String, required:true},
    pages_read: {type: Number, required:true},
})

module.exports = mongoose.model("readinghistories", readinghistory);