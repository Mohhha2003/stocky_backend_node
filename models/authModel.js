const mongoose =require("mongoose");




const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    image:String
});

const authModel = mongoose.model("User",userSchema);


module.exports = authModel;

