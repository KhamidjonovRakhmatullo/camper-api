const multer = require("multer");
const path = require("path");

// //path to upload
// const storage = multer.diskStorage({
//   destination: `./public/uploads`,
//   filename: function(req, file, cb){
//     cb(
//       null,
//       file.fieldname + `-` + Date.now() + path.extname(file.originalname)
//     )
//   }
// })

// //file type
function checkFileType(file, cb){
  const fileTypes = /jpeg|jpg|png|svg|giv|avif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  if(extname){
    return cb(null, true)
  } else{
    cb(`Error: You can upload only images!`)
  }
}

const uploadDisk = multer({
  // storage,
  storage: multer.memoryStorage(),
  limits: { fileSize: 100000 },
  fileFilter: function(req, file, cb){
    checkFileType(file, cb)
  }
})

module.exports = uploadDisk