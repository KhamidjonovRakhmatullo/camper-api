const multer = require("multer");
const path = require("path");

// //path to upload
// const storage = multer.diskStorage({
//   destination: `./public/uploads`,
//   filename: function(req, file, cb){
//     cb(
//       null,
//       file.fieldname + `-` + Date.now + path.extname(file.originalname)
//     )
//   }
// })

// //file type
// function checkFileType(file, cb){
//   const fileTypes = /gpeg|jpg|png|svg|giv|avif/;
//   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase)
//   if(extname){
//     return cb(null, true)
//   } else{
//     cb(`Error: You can upload only images!`)
//   }
// }

// const upload = multer({
//   storage,
//   limits: { fieldNameSize: "1048576" },
//   fileFilter: function(req, file, cb){
//     checkFileType(file, cb)
//   }
// })



const storage = multer.diskStorage({
  destination: `./public/uploads`,
  filename: function(req, file, cb){
    cb(
      null,
      file.fieldname + `-` + Date.now + path.extname(file.originalname)
    )
  }
})

function checkFileType(file, cb){
  const fileTypes =  /jpeg|jpg|png|svg|gif|avif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase)
  if(extname){
    return cb(null, true)
  } else{
    `Error: you can upload only image!`
  }
}

const upload = multer({
  storage,
  limits: {fileSize: "1048576"},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb)
  }
})
