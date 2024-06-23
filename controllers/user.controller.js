const User = require("../models/user.model");
const uuid = require("uuid");

//register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const apiKey = uuid.v4();

    ///unique email
    const userExist = await User.findOne({email})
    if(userExist){
        return res.status(409).json({
          success: false, 
          message: "This user's email already exists"
        })
    }
   ////
    const user = await User.create({
      name,
      email,
      password,
      apiKey,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
    //err
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    ///email
    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      return res.status(404).json({ 
        success: false, 
        message: "Invalid credentials! Email", 
      });
    }
    ///password
    const isMatch = await userInfo.matchPassword(password);

    if (!isMatch) {
      return res.status(404).json({ 
        success: false, 
        message: "Invalid credentials! Password", 
      });
    }
    //token
    const token = userInfo.generatedJwtToken()

    res.status(200).json({ success: true, data: token });
    ///err
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//me
const me = async (req, res) => {
  try {
    const {user} = req.body

    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = { register, login, me};
