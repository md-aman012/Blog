const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
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

userSchema.pre('save', async function(){
    if(!this.isModified('password')){
        return ;
    }
    try {
        const salt = await bcrypt.genSalt(12)
        const hashedpass = await bcrypt.hash(this.password, salt)
        this.password = hashedpass;
        
    } catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword = async function(user_pass){
    try {
        const isMatch = await bcrypt.compare(user_pass,this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const User = mongoose.model('User',userSchema) //compile Schema into useable Model
module.exports = User;