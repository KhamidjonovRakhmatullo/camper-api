const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

exports.protected = async (req, res, next) => {
  let token;
  //checking is there this user's token?
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //if no token
  if(!token){
    res.status(403).json({
        success: false,
        message: "Forbidden",
      });
  }
  //decoding token
  const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
  if(!decode.id){
    res.status(403).json({
        success: false,
        message: "Forbidden",
      });
  }
///
  const user = await User.findById(decode.id)
//   console.log(user)
  if(!user){
    res.status(403).json({
        success: false,
        message: "Forbidden",
      });
  }
  req.body.user = user;
  next();
};
