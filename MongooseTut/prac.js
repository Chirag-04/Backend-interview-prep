const mongoose  = require('mongoose');
// schema
const userSchema =  new mongoose.Schema({
    Name : String,
    age  : Number
})
// model

  module.exports = mongoose.model("User Model" , userSchema);