const mongoose = require("mongoose");
const users = mongoose.Schema({
    name:{type:String ,required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    state:{type:String},
})

module.exports = mongoose.model("users", users);