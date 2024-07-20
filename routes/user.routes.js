const {Router} = require("express");
const { register, login, me, update, deleteAccount, getUserInfo, get } = require("../controllers/user.controller");
const {protected} = require("../middleware/auth.middleware");
const uploadDisk = require("../utils/multer");

const router = Router();


router.post("/register", uploadDisk.single("avatar"), register)

router.post("/login", login)

router.get("/me", protected, me)

router.put("/update", protected, update)

router.delete("/delete", protected, deleteAccount)

router.delete("/delete/:id", protected, deleteAccount)

router.get("/get/:id", getUserInfo)


module.exports = router