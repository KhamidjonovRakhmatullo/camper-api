const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


exports.protected = async (req, res, next) => {
  let token;
  //have token?
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //if no:
  if (!token) {
    res.status(403).json({
      success: false,
      message: "Forbidden!",
    });
  }
  //decode token
  const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET)

  if(!decoded.id){
    res.status(403).json({
        success: "false",
        message: "Forbidden!"
    })
  }
  //find
  const user = await User.findById(decoded.id)
  
  if(!user){
    res.status(403).json({
        success: "false",
        message: "Forbidden!"
    })
  }
  req.body.user = user
  next();
};
