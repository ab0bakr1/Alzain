const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim : true
    },
    age : {
        type: Number,
        default: 18,
        validate(val){
            if(val <= 0){
                throw new Error('Age must be positive')
            }
        }
    },
    email : {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error('Email is invalid')
            }
        }
    },
    password : {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(val){
            let password = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
            if(!password.test(val)){
                throw new Error('Password must be strong')
            }
        }
    },
    tokens : [{
        token: {
            type: String,
            required: true
        }
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);