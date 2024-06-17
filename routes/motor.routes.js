const {Router} = require("express");
const { addNewMotor, getAllMotor } = require("../controllers/motor.controller");

const router = Router();

router.post("/post-motor", addNewMotor)

router.get("/getAllMotor", getAllMotor)

module.exports = router