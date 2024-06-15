const {Router} = require("express");
const { addNewMotor } = require("../controllers/motor.controller");

const router = Router();

router.post("/post-motor", addNewMotor)

module.exports = router