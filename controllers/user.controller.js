const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user.model");
const uuid = require("uuid");
const ErrorResponse = require("../utils/errorResponse");
const { uploadFile } = require("../utils/s3");
const path = require ("path")

//register
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log(req.file)

  ////***************************** */
  ////***************************** */
  ////***************************** */

  //***********************///
  /*                        */
  /*   upload file to AWS   */
  /*                        */
  //***********************///
  const uploadEDfile = req.file

  if(!uploadEDfile){
    return next(new ErrorResponse("Image required", 409))
  }
  const uid = uuid.v4()
  const file_path = await uploadFile(
     uploadEDfile.buffer,
     uid + path.extname(uploadEDfile.originalname)
  )

  ////***************************** */
  ////***************************** */
  ////***************************** */

  const apiKey = uuid.v4();

  ///unique email
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorResponse("This user's email already exists", 409));
  }
  ////create
  const user = await User.create({
    name,
    email,
    password,
    // avatar: req.file ? "/uploads/" + req.file.filename : ``,
    avatar: file_path,
    apiKey,
  });

  res.status(201).json({
    success: true,
    data: user,
  });
  //err
});

//********************** */
// login
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  ///email
  const userInfo = await User.findOne({ email });

  if (!userInfo) {
    return next(new ErrorResponse("Invalid credentials!", 404));
  }
  ///password match
  const isMatch = await userInfo.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials!", 404));
  }
  //token
  const token = await userInfo.generatedJwtToken();

  res.status(200).json({ success: true, token: token });
  ///err
});

//me
const me = asyncHandler(async (req, res, next) => {
  const { user } = req.body;

  res.status(200).json({
    success: true,
    data: user,
  });
});

//getUserInfo
const getUserInfo = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id)

  if(!user){
    return next(new ErrorResponse("UserInfo not found", 404))
  }

  res.status(200).json({
    success: true,
    userInfosAre: user,
  });
});

//update
const update = asyncHandler(async(req, res)=> {
  const id = req.body.user._id 
  const {name, email} = req.body
  const changesUser = await User.findByIdAndUpdate(
    id,
    {name, email},
    {new: true}
  )
  res.status(200).json({
    success: true,
    messageData : changesUser
  })
})

//delete
const deleteAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // const id = req.body.user._id

  await User.findByIdAndDelete(id)

  res.status(200).json({
    success: true,
    message: "Succesfully deleted"
  })
})


module.exports = { register, login, me, update, deleteAccount, getUserInfo };