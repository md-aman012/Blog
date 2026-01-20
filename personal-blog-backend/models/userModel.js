const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type: String,
            required:true,
        },

    },{
        timestamps:true,
    }
)

const User = mongoose.model('User',userSchema) //compile Schema into useable Model
module.exports = User;