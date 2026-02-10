const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: "fail",
        message: "please provide a username and password",
      });
    }

    const user = await User.findOne({ username }).select("+password");
    //We explicitly ask to include the password field using .select('+password').
    // It's good practice to set 'select: false' on password fields in the schema
    // and only include it when needed, like here for authentication.

    if (!user) {
      console.log("LOGIN_DEBUG: user not found for username", username);
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }

    const passwordMatch = await user.comparePassword(password);
    console.log("LOGIN_DEBUG: passwordMatch=", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }

    const payload = {id:user._id };

    // Use the same env var name as in authMiddleware (JWT_SECRET)
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
        status: 'success',
        token
    })

  } catch (error) {
    console.error('LOGIN_ERROR', error)
    res.status(500).json({
        status: 'error',
        message: 'An internal serer error occured'
    })
  }
};

const signup = async (req,res) => {
  const {username,password,email} = req.body;
  try{
    let user = await User.findOne({username});
    if(user) return res.status(400).json({message : 'User Already exist'});

    user = new User({username,password,email});
    await user.save();

    const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{
      expiresIn: '1h'
    });
    res.status(201).json({token})

  }catch(error){
      res.status(500).json({message : 'Server error'});
  }
}

module.exports = {login,signup};
