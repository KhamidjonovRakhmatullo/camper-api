const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user.model");
const uuid = require("uuid");
const ErrorResponse = require("../utils/errorResponse");

//register
const register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const apiKey = uuid.v4();

    ///unique email
    const userExist = await User.findOne({email})
    if(userExist){
        return next(new ErrorResponse("This user's email already exists", 409))
    }
   ////create
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
})

// login
const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    ///email
    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      return next(new ErrorResponse("Invalid credentials!", 404))
    }
    ///password match
    const isMatch = await userInfo.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials!", 404))
    }
    //token
    const token = await userInfo.generatedJwtToken()

    res.status(200).json({ success: true, data: token });
    ///err
})

//me
const me = async (req, res) => {
  try {
    const {user} = req.body

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = { register, login, me};
