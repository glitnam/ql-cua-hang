const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require:true,
        minlength:6,
        maxlength:20,
        unique:true
    },
    email:{
        type: String,
        require:true,
        minlength:10,
        maxlength:50,
        unique:true
    },
    password:{
        type: String,
        require:true,
        minlength:6,
    },
    phone:{
        type: String,
        minlength : 10,
        maxlength : 10,
        unique : true
    },
    birthday: {
        type: Date 
    },
    address:  { 
        type: String 
    }, 
    role: {
        type: String,
        enum: ["admin", "staff", "user"],
        default: "user"
    },
},{timestamps:true}
);

module.exports = mongoose.model("User", userSchema);
