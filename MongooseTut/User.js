// for creating database
// first we have to create schema of our db
// then we will create a model

// step 1 : require ODM library
const mongoose = require('mongoose')

// step 2 : creating schema
const addressSchema = new mongoose.Schema({
    state : String,
    city  : String,
    stretNo: Number,
})
const userSchema = new mongoose.Schema({
    name : String,
    age :{
        type : Number,
        min : 0 , 
        max : 90, 
    },
    email :{
        type : String,
        required : true, 
        lowercase : true, 
    },
    createdAt:{
        type : Date,
        default : ()=> Date.now(), // provides dynamic date
    },
    updateAt :{
        type : Date , 
        default : ()=> Date.now(),
    },
    hobbies : [String],
    bestFriend : mongoose.SchemaTypes.ObjectId, // for referencing
    address : addressSchema,
})

// step3: creating a model
module.exports = mongoose.model("User" , userSchema)

